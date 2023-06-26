import React, { useEffect, useState } from "react";
import { AddProductModal } from "../form/streamer-submission-form";
import { UpdateProductModal } from "../modals/update-storage-product-modal";
import { getUserItems } from "../../services/message.service";

export const StreamersTable = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();

  const [filteredMessage, setFilteredMessage] = useState(null);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getUserInv = async () => {
      const { data, error } = await getUserItems();
      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(data);
      }
      if (error) {
        setMessage(error);
      }
    };
    getUserInv();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {showAddModal && <AddProductModal setShowAddModal={setShowAddModal} />}
      {showUpdateModal && (
        <UpdateProductModal
          setShowUpdateModal={setShowUpdateModal}
          updateStreamerId={idUpdateItem}
          streamerToUpdate={itemToUpdate}
        />
      )}
      <div className="streamersTable-body">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="table-header">Streamer Name</th>
                <th className="table-header">Platform</th>
                <th className="table-header">description</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            {message.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <p className="storage__error">
                      The list is empty or a database error has occurred. Please
                      try again later or add a streamer.
                    </p>
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
