import { User } from "../App";

interface DeleteModalProps {
    deleteModalVisible: boolean;
    onClose: () => void;
    onDelete: () => void;
    selectedItem: User | null;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
    const { selectedItem, deleteModalVisible, onClose, onDelete } = props

    if (!deleteModalVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 background-blur-sm flex justify-center items-center">
            <div className="md:w-[600px] w-[90%] mx-auto flex flex-col">
                <div className="bg-white p-2 rounded">
                    <div className="py-6 px-6 lg:px-8 text-center mt-4">
                        <label
                            className="block mb-5 text-xl text-black font-bold text-gray-900">{`Are you sure you want to delete the user: ${selectedItem?.name}?`}</label>
                        <div className=" flex justify-between gap-3 sm:w-1/2 w-[75%] text-center mx-auto">
                            <button
                                onClick={onDelete}
                                className="mb-5 w-full text-white bg-red-700
                        hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center h-12" >
                                Delete
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full text-white bg-blue-700
                        hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center h-12" >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;