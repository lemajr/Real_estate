import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getUserIdByEmail, googleSignIn, saveBooking, removeBooking, checkBookingStatus } from '@/lib/actions';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingBtnProps {
  propertyId: string;
}

const BookingBtn = ({ propertyId }: BookingBtnProps) => {
  const { data: session } = useSession();
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookingStatus = async () => {
      if (!session?.user?.email) return;

      setIsLoading(true);
      try {
        const id = await getVisitorId(session.user.email);
        if (!id) return;

        const bookingStatus = await checkBookingStatus(id, propertyId);
        setIsBooked(bookingStatus);
      } catch (error) {
        console.error(`Error fetching booking status for ${propertyId}:`, error);
        setIsBooked(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingStatus();
  }, [session, propertyId]);

  const getVisitorId = async (email: string): Promise<string | null> => {
    try {
      const visitorData = await getUserIdByEmail(email);
      if (!visitorData || !visitorData.visitor_id) {
        console.error('No valid visitor ID for email:', email);
        return null;
      }
      return visitorData.visitor_id;
    } catch (error) {
      console.error('Error getting visitor ID:', error);
      return null;
    }
  };

  const handleBookingToggle = async () => {
    if (!session?.user?.email) {
      toast.error('Please log in to book this property');
      googleSignIn();
      return;
    }

    setIsLoading(true);
    const email = session.user.email;
    const id = await getVisitorId(email);

    if (!id) {
      console.log('Failed to get user ID');
      setIsLoading(false);
      return;
    }

    const bookingData = { visitorId: id, propertyId };

    try {
      const action = isBooked ? removeBooking : saveBooking;
      const { success, error } = await action(bookingData);

      if (success) {
        setIsBooked(!isBooked);
        toast.success(isBooked ? 'Booking canceled' : 'Booking successful');
      } else {
        toast.error(error || `Failed to ${isBooked ? 'cancel booking' : 'book'}`);
      }
    } catch (error) {
      console.error('Toggle error, Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
   <Button
  className={cn(
    'btn-secondary rounded-lg shadow-sm transition-all duration-200',
    isLoading && 'cursor-not-allowed outline !bg-none animate-pulse text-black',
    isBooked && 'outline border border-zinc-950 !bg-transparent hover:bg-gray-900 !text-black hover:text-gray-100'
  )}
  disabled={isLoading}
  onClick={handleBookingToggle}
>
  {isLoading ? (
    <span className="flex items-center gap-1">
      <LoaderIcon className="animate-spin size-6" /> Wait a minute...
    </span>
  ) : (
    isBooked ? 'Cancel Booking' : 'Book the Visit'
  )}
</Button>


  </div>
  
    ); 
};

export default BookingBtn;
