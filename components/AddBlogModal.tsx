import { useState } from 'react';
import '../src/app/globals.css';

interface BlogData {
  title: string;
  image: File | null;
  description: { heading: string; paragraph: string }[];
}

interface AddBlogModalProps {
  onClose: () => void;
  onSave: (blogData: BlogData) => void;
}

const AddBlogModal = ({ onClose, onSave }: AddBlogModalProps) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [descriptions, setDescriptions] = useState([{ heading: '', paragraph: '' }]);

  const handleAddSection = () => setDescriptions([...descriptions, { heading: '', paragraph: '' }]);

  const handleRemoveSection = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = { ...updatedDescriptions[index], [field]: value };
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, image, description: descriptions });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh] w-full md:w-1/2 relative z-50">
        <h2 className="text-lg font-bold mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 mb-4"
            required
          />

          {descriptions.map((desc, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <input
                type="text"
                value={desc.heading}
                onChange={(e) => handleInputChange(index, 'heading', e.target.value)}
                placeholder="Heading"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <textarea
                value={desc.paragraph}
                onChange={(e) => handleInputChange(index, 'paragraph', e.target.value)}
                placeholder="Paragraph"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveSection(index)}
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSection}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Section
          </button>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Save Blog
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogModal;
