// pages/api/get-projects.js
import dbConnect from '../../utils/dbConnect';
import Project from '../../models/Project';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const projects = await Project.find({}); // Fetch all projects from the database

    return res.status(200).json(projects); // Return the projects as a JSON response
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Failed to fetch projects', message: error.message });
  }
}
