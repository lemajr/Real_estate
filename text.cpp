#include<iostream>

using namespace std;

// Function to calculate the sum of all prime numbers between two given numbers

int main() {
    int a, b;
    cin >> a >> b;
    int sum = 0;
    for (int i = a; i <= b; i++) {
        int j;
        for (j = 2; j < i; j++) {
            if (i % j == 0) {
                break;
            }
        }
        if (j == i) {
            sum += i;
        }
    }
    cout << sum << endl;
    return 0;
}