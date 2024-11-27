// pages/api/get-worker-profile.js

export default async function handler(req, res) {
    try {
      // Example of returning static worker profile data
      const workerProfile = {
        id: 1,
        name: 'Deepak',
        rating: 4.5,
        price: 600,
        expertise: 'Construction Worker',
        picture: 'https://i.timesnowhindi.com/stories/MAJDOOR-AP_0.jpg',
        address: 'Prem-Nagar',
        totalEarnings: 5000,
        completedProjects: 12,
      };
  
      // Respond with the worker profile
      res.status(200).json(workerProfile);
    } catch (error) {
      console.error('Error fetching worker profile:', error);
      // Handle error response
      res.status(500).json({ message: 'Failed to fetch worker profile' });
    }
  }
  