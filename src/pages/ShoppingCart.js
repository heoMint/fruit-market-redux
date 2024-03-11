import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setQuantity } from '../actions';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

export default function ShoppingCart() {
    const state = useSelector((state) => state.itemReducer);
    const { cartItems, items } = state;
    const dispatch = useDispatch();
    // 각 요소의 itemId 값을 추출한 배열을 만들어준다.
    const [checkedItems, setCheckedItems] = useState(cartItems.map((el) => el.itemId));

    // 체크박스의 체크여부를 확인하는 함수
    const handleCheckChange = (checked, id) => {
        if (checked) {
            setCheckedItems([...checkedItems, id]);
        } else {
            setCheckedItems(checkedItems.filter((el) => el !== id));
        }
    };
    // 전체 상품을 체크하는 함수
    const handleAllCheck = (checked) => {
        if (checked) {
            setCheckedItems(cartItems.map((el) => el.itemId));
        } else {
            setCheckedItems([]);
        }
    };
    // 수량을 변경하는 함수
    const handleQuantityChange = (quantity, itemId) => {
        dispatch(setQuantity(itemId, quantity));
    };
    // 상품 삭제하는 함수
    const handleDelete = (itemId) => {
        setCheckedItems(checkedItems.filter((el) => el !== itemId));
        // removeFromCart 액션을 디스패치하여 아이템을 장바구니에서 제거합니다
        dispatch(removeFromCart(itemId));
    };
    // 상품의 합계를 계산하는 함수
    const getTotal = () => {
        let cartIdArr = cartItems.map((el) => el.itemId);
        let total = {
            price: 0,
            quantity: 0,
        };
        for (let i = 0; i < cartIdArr.length; i++) {
            if (checkedItems.indexOf(cartIdArr[i]) > -1) {
              // checkedItems 배여레서 아이템 수량과 가격을 곱해서 합계를 계산
                let quantity = cartItems[i].quantity;
                let price = items.filter((el) => el.id === cartItems[i].itemId)[0].price;

                total.price = total.price + quantity * price;
                total.quantity = total.quantity + quantity;
            }
        }
        return total;
    };
    // 렌더링 할 아이템목록을 필터링
    const renderItems = items.filter((el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1);
    const total = getTotal();

    return (
        <div id="item-list-container">
            <div id="item-list-body">
                <div id="item-list-title">장바구니</div>
                <span id="shopping-cart-select-all">
                    <input
                        type="checkbox"
                        checked={checkedItems.length === cartItems.length ? true : false}
                        onChange={(e) => handleAllCheck(e.target.checked)}
                    ></input>
                    <label className="cart-label">전체선택</label>
                </span>
                <div id="shopping-cart-container">
                    {!cartItems.length ? (
                        <div id="item-list-text">장바구니에 아이템이 없습니다.</div>
                    ) : (
                        <div id="cart-item-list">
                            {renderItems.map((item, idx) => {
                                const quantity = cartItems.filter((el) => el.itemId === item.id)[0].quantity;
                                return (
                                    <CartItem
                                        key={idx}
                                        handleCheckChange={handleCheckChange}
                                        handleQuantityChange={handleQuantityChange}
                                        handleDelete={handleDelete}
                                        item={item}
                                        checkedItems={checkedItems}
                                        quantity={quantity}
                                    />
                                );
                            })}
                        </div>
                    )}
                    <OrderSummary total={total.price} totalQty={total.quantity} />
                </div>
            </div>
        </div>
    );
}
