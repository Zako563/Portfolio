import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zakoRequestModel } from './model/zakoRequestModel';
import { zakoResponseModel } from './model/zakoResponseModel';
import { getZako, updateZako } from './api/updateZako';

interface UpdateZakoFormProps {
  zakoId: string;
  onClose: () => void;
}

const UpdateZakoForm: React.FC<UpdateZakoFormProps> = ({ zakoId, onClose }) => {
  const navigate = useNavigate();
  const [zako, setZako] = useState<zakoResponseModel | null>(null);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [language, setLanguage] = useState<string[]>([]);

  useEffect(() => {
    const fetchZako = async () => {
      try {
        const fetchedZako = await getZako(zakoId);
        setZako(fetchedZako);
        setName(fetchedZako.name || '');
        setTitle(fetchedZako.title || '');
        setSummary(fetchedZako.summary || '');
        setLanguage(fetchedZako.language || []);
      } catch (error) {
        console.error('Error fetching Zako:', error);
      }
    };
    fetchZako();
  }, [zakoId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!zako) return;

    const updatedZako: zakoRequestModel = {
      name,
      title,
      summary,
      language,
    };

    try {
      await updateZako(zakoId, updatedZako);
      alert('Zako updated successfully!');
      navigate('/zako');
    } catch (error) {
      console.error('Error updating Zako:', error);
      alert('Failed to update Zako.');
    }
  };

  if (!zako) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-zako-form">
      <h2>Update Zako</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Update Zako</button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateZakoForm;