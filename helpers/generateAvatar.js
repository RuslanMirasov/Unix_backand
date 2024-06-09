const avatarColors = ['0D99FF', '0DFF25', 'FFAD0D', 'FF0D0D'];

const generateAvatar = email => {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  const avatarBackground = avatarColors[randomIndex];
  return `https://avatar.iran.liara.run/username?color=ffffff&background=${avatarBackground}&bold=true&size=180&length=1&username=${email[0]}`;
};

module.exports = generateAvatar;
