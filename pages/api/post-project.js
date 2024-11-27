// pages/api/post-project.js
import dbConnect from '../../utils/dbConnect';  // Reusing dbConnect
import Project from '../../models/Project';  // Assuming you have a Project model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();  // Reusing the same DB connection function

      const { title, budget, location, deadline } = req.body;

      // Check for missing required fields
      if (!title || !budget || !location || !deadline) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Validate budget to be a positive number
      if (isNaN(budget) || budget <= 0) {
        return res.status(400).json({ error: 'Budget must be a positive number' });
      }

      // Create a new project using the data
      const newProject = new Project({
        title,
        budget,
        location,
        deadline,
      });

      // Save to the database
      await newProject.save();  

      return res.status(201).json({
        message: 'Project posted successfully',
        project: newProject,
      });
    } catch (error) {
      console.error('Error posting project:', error);  // Log the error for debugging
      return res.status(500).json({ error: 'Failed to post project', message: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
