import { NextApiRequest, NextApiResponse } from 'next';
import Project from '@lib/Project';

const projectRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Project.validate(req.body)) {
      return res.status(400).json({ success: false, error: 'Bad Body' });
    }
    const project = new Project(req.body);
    await project.save();
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'project request failed' });
  }
};

export default projectRoute;
