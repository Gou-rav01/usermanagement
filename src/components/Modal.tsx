import { BaseSyntheticEvent, useEffect, useState } from "react";
import { User } from "../App";

interface ModalProps {
    onClose: () => void;
    modalVisibile: boolean;
    selectedItem: User | null;
    isEditing: boolean;
    onUpdateUser: (title: string, description: string) => void;
    onAddUser: (title: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ modalVisibile, selectedItem, isEditing, onClose, onUpdateUser, onAddUser }) => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")

    const onSubmit = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        if (isEditing) {
            onUpdateUser(title, description)
        } else {
            onAddUser(title, description)
        }
        resetData()
    }

    const resetData = () => {
        setTitle("")
        setDescription("")
    }

    const onCrossClick = () => {
        onClose()
        resetData()
    }

    useEffect(() => {
        if (selectedItem && isEditing) {
            setTitle(selectedItem.name)
            setDescription(selectedItem.company.catchPhrase)
        }
    }, [selectedItem])

    if (!modalVisibile) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 background-blur-sm flex justify-center items-center">
            <div className="md:w-[600px] w-[90%] mx-auto flex flex-col bg-white rounded-lg">
                <div className="flex justify-between p-6 pb-0">
                    <h3 className="text-xl text-black font-bold">{isEditing ? "Edit User" : "Add User"}</h3>
                    <button onClick={onCrossClick} className="text-black text-xl place-self-end pr-3">X</button>

                </div>
                <div className="bg-white rounded">
                    <div className="py-6 px-6 lg:px-8 text-left">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    name="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900
                                    text-sm rounded-lg focus:ring-blue-500
                                    focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    name="description"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900
                                    text-sm rounded-lg focus:ring-blue-500
                                    focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Description"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700
                                    hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center" >
                                    {isEditing ? "Update User" : "Add User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;