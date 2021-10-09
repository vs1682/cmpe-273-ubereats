import React from 'react';
import { useCart } from 'react-use-cart';
import { useStyletron } from 'styletron-react';
import { Select } from "baseui/select";

const CartItem = ({
  item
}) => {
  const [css] = useStyletron();
  const { removeItem, updateItemQuantity } = useCart();

  const getOptions = () => {
    const options = [{ id: 'REMOVE', label: 'Remove' }];
    
    for (let i=1; i<=20; ++i) {
      options.push({ id: i, label: i });
    }

    return options;
  }

  const onChangeQuantity = (params) => {
    const id = params.option.id;

    if (id === 'REMOVE') {
      removeItem(item.id);
    } else {
      updateItemQuantity(item.id, params.option.id);
    }
  }

  return (
    <div className={css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid #dedede'
    })}>
      <div className={css({
        display: 'flex',
        alignItems: 'center'
      })}
      >
        <Select
          options={getOptions()}
          value={[{ id: item.quantity, value: item.quantity }]}
          searchable={false}
          clearable={false}
          onChange={onChangeQuantity}
          overrides={{
            Root: {
              style: { width: '72px' }
            },
            ControlContainer: {
              style: { borderRadius: '32px' }
            }
          }}
        />
        <div
          className={css({
            marginLeft: '16px',
            fontSize: '16px',
            fontWeight: 600,
            marginRight: '16px'
          })}
        >
          {item.name}
        </div>
      </div>
      <div>{`$${item.itemTotal}`}</div>
    </div>
  );
}

export default CartItem;
