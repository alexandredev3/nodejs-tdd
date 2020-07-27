import bcrypt from 'bcryptjs';

import { User } from '../../src/app/models';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Alexandre',
      email: 'alexandre@gmail.com',
      password: '12345678',
    });

    const compareHash = await bcrypt.compare('12345678', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
