import { useEffect, useState } from 'react';
import GroupImage from './components/GroupImage';
import MemberList from './components/MemberList';
import { getApiInfo } from './services/apiInfo';
import { Group } from './types/Group';
import Loading from './components/Loading';
import Alert from './components/Alert';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<Group>({
    groupName: 'Red Velvet',
    memberCount: 5,
    members: [
      {
        name: 'Seulgi',
        position: 'Main Dancer, Sub Rapper',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Kang_Seulgi_LONGCHAMP_2024.jpg/330px-Kang_Seulgi_LONGCHAMP_2024.jpg',
      },
      {
        name: 'Yeri',
        position: 'Sub Vocalist, Rapper, Maknae (youngest member)',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/240511_Red_Velvet_Yeri.jpg/330px-240511_Red_Velvet_Yeri.jpg',
      },
      {
        name: 'Irene',
        position: 'Leader, Lead Rapper, Lead Dancer, Visual',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/250320_%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3_Irene_UGG_Photo_Call.jpg/500px-250320_%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3_Irene_UGG_Photo_Call.jpg',
      },
      {
        name: 'Wendy',
        position: 'Man Vocalist',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_Velvet_Wendy_2025-03-20.png/330px-Red_Velvet_Wendy_2025-03-20.png',
      },
      {
        name: 'Joy',
        position: 'Lead Rapper, Sub Vocalist',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/240719_Red_Velvet_Joy.jpg/330px-240719_Red_Velvet_Joy.jpg',
      },
    ],
    isDefault: true,
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3%28Red_Velvet%29_%EC%BC%80%EC%9D%B4%EC%BD%98_%EC%9E%AC%ED%8C%AC_2024_%EB%A0%88%EB%93%9C%EC%B9%B4%ED%8E%AB_KCON_JAPAN_2024_%281%29.jpg/500px-%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3%28Red_Velvet%29_%EC%BC%80%EC%9D%B4%EC%BD%98_%EC%9E%AC%ED%8C%AC_2024_%EB%A0%88%EB%93%9C%EC%B9%B4%ED%8E%AB_KCON_JAPAN_2024_%281%29.jpg',
  });

  const [isErrorPath, setIsErrorPath] = useState(false);

  useEffect(() => {
    async function loadData(groupName: string) {
      setIsLoading(true);
      const group: Group | undefined = await getApiInfo(groupName);

      if (group) {
        setGroup(group);
        setIsErrorPath(false);
      } else {
        setIsErrorPath(true);
      }

      setIsLoading(false);
    }

    const groupName =
      window.location.pathname.split('/')?.slice(-1) || 'Red Velvet';

    loadData(groupName[0]);
  }, []);

  return (
    <main className="text-center">
      {isErrorPath && <Alert />}
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="mt-20">
          <GroupImage img={group.avatar} />
          <br />
          <MemberList group={group} />
        </section>
      )}
    </main>
  );
}

export default App;
