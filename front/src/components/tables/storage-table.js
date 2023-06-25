import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorCategory } from "../layout/error-category";
import { AddProductModal } from "../modals/add-storage-product-modal";
import { UpdateProductModal } from "../modals/update-storage-product-modal";
import {
  getUserItems,
  getOtherUserItems,
} from "../../services/message.service";

export const Table = () => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently, user } = useAuth0();

  const [selectValue, setSelectValue] = useState(`${user.name}`);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [filteredMessage, setFilteredMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [categoryErr, setCategoryErr] = useState(false);

  const getMessage = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getOtherUserItems(accessToken, selectValue);
    if (data) {
      setMessage(data);
      setFilteredMessage(null);
    }
    if (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const getUserInv = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserItems(accessToken, user);
      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(data);
      }
      if (error) {
        setMessage(error);
      }
      if (user.email === "admin@test.com") {
        getMessage();
      }
    };
    getUserInv();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, user]);

  const renderInventory = (message, index) => {
    return (
      <tr key={index}>
        <td>{message.streamerName}</td>
        <td>{message.platform}</td>
        <td>{message.description}</td>
        <td>
          <div className="container__controls">
            <div
              className="controls__edit"
              onClick={() => handleShowUpdateModal(index)}
            >
              &#9998;<span className="controls__edit-tooltiptext">Edytuj</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const handleshowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowUpdateModal = (index) => {
    if (filteredMessage) {
      const idRemoveItem = filteredMessage[index]._id;
      const itemToUpdate = filteredMessage[index];
      setidUpdateItem(idRemoveItem);
      setitemToUpdate(itemToUpdate);
      setShowUpdateModal(true);
    } else {
      const idRemoveItem = message[index]._id;
      const itemToUpdate = message[index];
      setidUpdateItem(idRemoveItem);
      setitemToUpdate(itemToUpdate);
      setShowUpdateModal(true);
    }
  };

  return (
    <>
      {showAddModal && (
        <AddProductModal
          nameUser={selectValue}
          setShowAddModal={setShowAddModal}
        />
      )}
      {showUpdateModal && (
        <UpdateProductModal
          setShowUpdateModal={setShowUpdateModal}
          nameUser={selectValue}
          updateStreamerId={idUpdateItem}
          streamerToUpdate={itemToUpdate}
        />
      )}
      <div className="table__body">
        {categoryErr && <ErrorCategory props={"inwentaryzacji"} />}
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="table-header">Streamer Name</th>
                <th className="table-header">Platform</th>
                <th className="table-header">description</th>
              </tr>
            </thead>
            {message.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <p className="storage__error">Nie znaleziono artykułów.</p>
                  </td>
                </tr>
              </tbody>
            )}
            {filteredMessage === null && (
              <tbody>{message.map(renderInventory)}</tbody>
            )}
            {filteredMessage && (
              <tbody>{filteredMessage.map(renderInventory)}</tbody>
            )}
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <button
                    className="button button--primary"
                    onClick={handleshowAddModal}
                  >
                    Dodaj nowy produkt
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
