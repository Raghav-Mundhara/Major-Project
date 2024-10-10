import React from 'react';

function Delete() {
    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:3000/clear-images', {
                method: 'DELETE',
            });
            const result = await response.json();
            alert(result.msg); // Show success or error message
            window.location.reload(); // Reload the page to reflect changes
        } catch (error) {
            console.error('Error deleting images:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Delete All Images
            </button>
        </div>
    );
}

export default Delete;
