import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Group, useAdaptivityConditionalRender, List, Cell, Avatar } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';


import { Persik, Home, NewPanel } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState();
  const { viewWidth } = useAdaptivityConditionalRender();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const [draggingList, updateDraggingList] = useState([
    'Say',
    'Hello',
    'To',
    'My',
    'Little',
    'Friend',
  ]);

  const onDragFinish = ({ from, to }) => {
    const _list = [...draggingList];
    _list.splice(from, 1);
    _list.splice(to, 0, draggingList[from]);
    updateDraggingList(_list);
  };

  return (
    <SplitLayout popout={popout}>
      <SplitCol  autoSpaced >
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
          <Persik id="persik" />
          <NewPanel id='newpanel'/>
        </View>
      </SplitCol>
      <SplitCol width={280} maxWidth={280} className={viewWidth.tabletPlus.className}>
        <Group>
        <List>
            {draggingList.map((item) => (
              <Cell key={item} before={<Avatar />} draggable onDragFinish={onDragFinish}>
                {item}
              </Cell>
            ))}
          </List>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};
