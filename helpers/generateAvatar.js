const avatarColors = ['0D99FF', '0DFF25', 'FFAD0D', 'FF0D0D'];

const generateAvatar = email => {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  const avatarBackground = avatarColors[randomIndex];
  return `https://avatar.iran.liara.run/username?color=ffffff&background=${avatarBackground}&bold=false&size=150&length=1&username=${email[0]}`;
};

module.exports = generateAvatar;
