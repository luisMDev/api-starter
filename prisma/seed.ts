import { CONFIG_KEY, CONFIG_TYPE, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const data = [
  { id: CONFIG_KEY.PROJECT_NAME, value: 'Arcane Auth', type: CONFIG_TYPE.STRING },
  { id: CONFIG_KEY.COLOR_PRIMARY, value: '#fff', type: CONFIG_TYPE.COLOR },
  { id: CONFIG_KEY.COLOR_SECONDARY, value: '#000', type: CONFIG_TYPE.COLOR },
  { id: CONFIG_KEY.COLOR_ACCENT, value: '#eee', type: CONFIG_TYPE.COLOR },
  {
    id: CONFIG_KEY.IMAGE_LOGO,
    value: 'https://github.com/arcane-auth/.github/blob/main/profile/logo2.png?raw=true',
    type: CONFIG_TYPE.FILE,
  },
  {
    id: CONFIG_KEY.IMAGE_BACKGROUND,
    value: '',
    type: CONFIG_TYPE.FILE,
  },
  { id: CONFIG_KEY.LINK_GITHUB, value: 'https://github.com/arcane-auth', type: CONFIG_TYPE.URL },
  { id: CONFIG_KEY.LINK_DOCS, value: 'https://github.com/arcane-auth/arcane-auth/wiki', type: CONFIG_TYPE.URL },
  { id: CONFIG_KEY.ALLOW_SIGNUP, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_PASSWORD, value: 'true', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_GITHUB, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_GOOGLE, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_FACEBOOK, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_TWITTER, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_DISCORD, value: 'false', type: CONFIG_TYPE.BOOLEAN },
  { id: CONFIG_KEY.PROVIDER_APPLE, value: 'false', type: CONFIG_TYPE.BOOLEAN },
];

async function main() {
  const promises = [];

  data.forEach((item) => {
    promises.push(
      prisma.um_Config.upsert({
        where: { id: item.id },
        update: {},
        create: item,
      }),
    );
  });

  await prisma.um_User.upsert({
    where: { id: '1' },
    update: {},
    create: {
      email: 'root@root.com',
      name: 'root',
      password: await hash('root', 10),
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=root',
    },
  });

  const ret = Promise.all(promises);

  console.log(ret);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
