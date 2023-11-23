import { useEffect, useState } from 'react';
import './App.css';
import UserItem from './components/UserItem';
import Dropdown from './components/DropDown';
import Modal from './components/Modal';
import ApiService from './apiService/ApiService';
import DeleteModal from './components/DeleteModal';
import Loader from './components/Loader';

export interface User {
  id: number;
  name: string;
  company: {
    catchPhrase: string;
  };
}

function App() {

  const [userData, setUserData] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [modalVisibile, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserData = async () => {
    setIsLoading(true)
    const userResponse = await ApiService.getUserData();
    setIsLoading(false)
    if (!userResponse) {
      console.error("Get user API call failed");
      return
    }
    setUserData(userResponse)
  }

  const onAddUser = async (title: string, description: string) => {
    setModalVisible(false)
    setIsLoading(true)
    const addUserResponse = await ApiService.addUser(title, description);
    setIsLoading(false)
    if (!addUserResponse) {
      console.error("Add user API call failed");
      return
    }
    setUserData((prev) => [addUserResponse, ...prev])
  }

  const onUpdateUser = async (title: string, description: string) => {
    if (!selectedItem) {
      console.error("No selected item");
      return
    };
    setIsLoading(true)
    setIsEditing(false)
    setModalVisible(false)
    const updatedUserResponse = await ApiService.updateUser(selectedItem.id, title, description)
    setIsLoading(false)
    if (!updatedUserResponse) {
      console.error("Update user API call failed");
      return
    }
    const newUserData = userData.map(user => {
      if (user.id === selectedItem.id) {
        return updatedUserResponse;
      }
      return user;
    });
    setUserData(newUserData)
  }

  const onDeleteUser = async () => {
    if (!selectedItem) {
      console.error("No selected item");
      return
    };
    setIsLoading(true)
    setDeleteModalVisible(false);
    await ApiService.deleteUser(selectedItem.id);
    setIsLoading(false)
    setUserData(userData.filter((user: User) => user.id !== selectedItem.id))
    setSelectedItem(null);
  }

  const onDelete = async (item: User) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  }

  const onDeleteModalClose = () => {
    setDeleteModalVisible(false)
    setSelectedItem(null)
  }

  const onEdit = async (item: User) => {
    setSelectedItem(item)
    setIsEditing(true)
    setModalVisible(true)
  }

  const ondropDownSelected = (value: number) => {
    const sortedData = [...userData].sort((a: User, b: User) => {
      if (value === 1) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUserData(sortedData);
  }

  const usersList = () => {
    let usersListData = (searchValue ? userData.filter((item: User) => item.name.toLowerCase().includes(searchValue.toLowerCase())) : userData)
    return usersListData.map((user: User) => <UserItem key={user.id} users={user} onDelete={onDelete} onEdit={onEdit} />)
  }

  const onCloseModal = () => {
    setSelectedItem(null);
    setIsEditing(false)
    setModalVisible(false)
  }

  const onAddButtonClick = () => {
    setModalVisible(true)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="sm:text-3xl text-xl font-bold underline m-5">User Management</h1>
        <button
          onClick={onAddButtonClick}
          className="w-100 m-2 text-white bg-blue-700
                    font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 p-2  
                    text-center">
          Add User
        </button>
      </div>
      <div style={{ backgroundColor: '#eee' }} className="flex p-10">
        <Dropdown onSelected={ondropDownSelected} />
        <div className="relative w-full">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            type="search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 
            rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 
            dark:bg-gray-700 
            dark:border-s-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white"
            placeholder="Search..."
          />
        </div>
      </div>
      <ul role="list">
        {usersList()}
      </ul>
      <Modal
        onAddUser={onAddUser}
        onUpdateUser={onUpdateUser}
        onClose={onCloseModal}
        isEditing={isEditing}
        modalVisibile={modalVisibile}
        selectedItem={selectedItem} />

      <DeleteModal
        selectedItem={selectedItem}
        deleteModalVisible={deleteModalVisible}
        onClose={onDeleteModalClose}
        onDelete={onDeleteUser} />

      {isLoading && <Loader />}
    </div>
  );
}

export default App;
