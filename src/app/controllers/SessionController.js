import { User } from '../models';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ error: 'User not found!' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Incorrect password' });
    }

    return response.json({ user, token: user.generateToken() });
  }
}

export default SessionController;
