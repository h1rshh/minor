import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [0, 'Budget must be a positive number'], // Ensure budget is positive
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
      validate: {
        validator: function (v) {
          return v > new Date(); // Ensure the deadline is a future date
        },
        message: 'Deadline must be a future date',
      },
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
