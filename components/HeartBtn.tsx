import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { getUserIdByEmail, googleSignIn, saveLike, removeLike, checkLikeStatus } from '@/lib/actions';
import { LucideLoader } from 'lucide-react';

interface HeartBtnProps {
  propertyId: string;
}

const HeartBtn = ({ propertyId }: HeartBtnProps) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!session?.user?.email) return;

      setIsLoading(true);
      try {
        const id = await getVisitorId(session.user.email);
        if (!id) return;

        const likeStatus = await checkLikeStatus(id, propertyId);
        setIsLiked(likeStatus);
      } catch (error) {
        console.error(`Error fetching like status for ${propertyId}:`, error);
        setIsLiked(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeStatus();
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

  const handleLikeToggle = async () => {
    if (!session?.user?.email) {
      toast.error('Please log in to like this property');
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

    const likeData = { visitorId: id, propertyId };

    try {
      const action = isLiked ? removeLike : saveLike;
      const { success, error } = await action(likeData);

      if (success) {
        setIsLiked(!isLiked);
        toast.success(isLiked ? 'Unlike successful' : 'Like successful');
      } else {
        toast.error(error || `Failed to ${isLiked ? 'unlike' : 'like'}`);
      }
    } catch (error) {
      console.error('Toggle error, Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants for the heart
  const heartVariants = {
    initial: { scale: 1, color: isLiked ? '#ff0000' : '#ffffff' },
    hover: { scale: 1.1 }, // Scale up on hover
    click: { scale: 0.9, transition: { duration: 0.1 } }, // Quick scale down on click
    liked: { color: '#ff0000', transition: { duration: 0.3 } }, // Smooth color change
    unliked: { color: '#ffffff', transition: { duration: 0.3 } },
  };

  // Loader remains static with spin
  const loaderVariants = {
    loading: {
      rotate: [0, 360],
      transition: { duration: 1, repeat: Infinity, ease: 'linear' },
    },
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={loaderVariants}
            animate="loading"
          >
            <LucideLoader size={23} className="text-gray-500" /> {/* Static size, just spins */}
          </motion.div>
        </div>
      ) : (
        <motion.div
          variants={heartVariants}
          initial="initial"
          whileHover="hover"
          whileTap="click"
          animate={isLiked ? 'liked' : 'unliked'} // Color transition
          onClick={handleLikeToggle}
        >
          <FaHeart size={23} className="cursor-pointer drop-shadow-sm" />
        </motion.div>
      )}
    </div>
  );
};

export default HeartBtn;