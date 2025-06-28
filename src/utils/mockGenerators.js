import bcrypt from 'bcrypt';

function getRandomRole() {
  return Math.random() < 0.5 ? 'user' : 'admin';
}

const petTypes = ['dog', 'cat', 'bird', 'hamster'];

export function generateMockUsers(amount = 50) {
  const users = [];
  const passwordHash = bcrypt.hashSync('coder123', 10);

  for (let i = 1; i <= amount; i++) {
    users.push({
      first_name: `FirstName${i}`,
      last_name: `LastName${i}`,
      email: `user${i}@example.com`,
      age: Math.floor(Math.random() * 60) + 18,
      password: passwordHash,
      role: getRandomRole(),
      pets: [],
      cart: null,
    });
  }
  return users;
}

export function generateMockPets(amount = 50) {
  const pets = [];

  for (let i = 1; i <= amount; i++) {
    pets.push({
      name: `Pet${i}`,
      type: petTypes[Math.floor(Math.random() * petTypes.length)],
      age: Math.floor(Math.random() * 15) + 1,
      owner: null,
    });
  }
  return pets;
}
