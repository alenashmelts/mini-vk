import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Link, FormItem, Select, Checkbox, Input, ChipsInput, Headline, AdaptivityProvider, ModalCardBase, Spacing, ViewWidth, ModalCard, Flex, SelectionControl, Switch } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { Icon56MoneyTransferOutline } from '@vkontakte/icons'
import { Fragment, useState } from 'react';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const [align, setAlign] = useState('left');
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [formItemStatus, setFormItemStatus] = useState('default');

  const [open, setOpen] = useState(false);
  return (
    <Panel id={id}>
      <div style={{ padding: 20 }}>
        <PanelHeader >
          Моё здоровье
        </PanelHeader>
      </div>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}





      <Group header={<Header mode="secondary">Сегодня</Header>}>

        <FormItem top="Мои тренировки">
          <Select
            value={align}
            onChange={(_, newValue) => setAlign(newValue)}
            options={[
              { label: 'Бег', value: 'left' },
              { label: 'Йога', value: 'center' },
              { label: 'Круговая тренировка', value: 'right' },
            ]}
          />
        </FormItem>
        {/* <Checkbox
            description="Icon24WalletOutline for example"
            checked={!!before}
            onChange={(e) =>
              e.target.checked ? setBefore(<Icon24WalletOutline />) : setBefore(undefined)
            }
          >
            before
          </Checkbox> */}
        {/* <Checkbox
            description="Icon20User for example"
            checked={!!after}
            onChange={(e) => (e.target.checked ? setAfter(<Icon20User />) : setAfter(undefined))}
          >
            after
          </Checkbox> */}

        <FormItem htmlFor="example" top="Указать время трениовки" status={formItemStatus}>
          <Input
            id="example"
            before={before}
            after={after}
            type="text"
            align={align}
            defaultValue="45 минут"
            disabled={disabled}
          />
        </FormItem>
        <Checkbox checked={disabled} onChange={(e) => setDisabled(e.target.checked)}>
          Тренировка без времени
        </Checkbox>

        <Headline level="1" style={{ marginBottom: 1 }}>
          Приемы пищи
        </Headline>


        <FormItem htmlFor="list" top="Указать блюдо на завтрак">
          <ChipsInput
            id="list"
            placeholder="Введите название и нажмите Enter"
            allowClearButton={true}
          />
        </FormItem>
        <FormItem htmlFor="list" top="Указать блюдо на обед">
          <ChipsInput
            id="list"
            placeholder="Введите название и нажмите Enter"
            allowClearButton={true}
          />
        </FormItem>
        <FormItem htmlFor="list" top="Указать блюдо на ужин">
          <ChipsInput
            id="list"
            placeholder="Введите название и нажмите Enter"
            allowClearButton={true}
          />
        </FormItem>



          {/* <ModalCardBase
            style={{ width: 450, marginBottom: 20 }}
            title="Приглашайте друзей и получайте бонусы на покупку спортивных товаров"
            description="Начислим бонусы вам и вашему другу"
            actions={
              <Fragment>
                <Spacing size={16} />
                <Button size="l" mode="primary" stretched>
                  Попробовать1
                </Button>
              </Fragment>
            }
          icon={<Icon56MoneyTransferOutline />}
          /> */}
      
      
      <SelectionControl>
        <SelectionControl.Label>Сохранять изменения автоматически</SelectionControl.Label>
        <Switch />
      </SelectionControl>


        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => setOpen(true)}>
            Перейти...
          </Button>
          <Link onClick={() => routeNavigator.push('newpanel')}>Новая панель</Link>
        </Div>
      </Group>
      
    </Panel>





  );
};


Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
