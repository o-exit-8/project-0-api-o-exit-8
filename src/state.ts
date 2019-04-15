import { User } from './model/user';
import { Spaceship } from './model/spaceship';

export let users: User[] = [
  new User(1, 'blake', 'pass' ),
  new User(2, 'Bradley', 'pass'),
  new User(3, 'Shahram', 'pass'),
  new User(4, 'Pj', 'pass'),
  new User(5, 'Danae', 'pass'),
  new User(6, 'Fred', 'pass'),
];

export let spaceships: Spaceship[] = [
  new Spaceship(1, 2, 'Enterprise', 5000, 5000, 'its a ship'),
  new Spaceship(2, 2, 'Tesla', 5000, 5000, 'its a ship'),
  new Spaceship(3, 2, 'SS Minow', 5000, 5000, 'its a ship'),
  new Spaceship(4, 2, 'X-Wing', 5000, 5000, 'its a ship'),
  new Spaceship(5, 4, 'Salmon Catcher', 5000, 5000, 'its a ship'),
  new Spaceship(6, 6, 'Serrenity', 5000, 5000, 'its a ship'),
  new Spaceship(7, 3, 'Yes', 5000, 5000, 'its a ship'),
];
