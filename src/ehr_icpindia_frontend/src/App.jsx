import React, { useState } from 'react';
import { ehr_icpindia_backend } from '../../../../declarations/ehr_icpindia_backend';

function App() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    contact: '',
    blood_group: '',
    gender: '',
    medications: [],
    chronic_conditions: [],
    allergies: [],
    visits: []
  });

  const [fetchedRecord, setFetchedRecord] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const updatedForm = {
      ...form,
      medications: [form.medications],
      chronic_conditions: [form.chronic_conditions],
      allergies: [form.allergies],
      visits: [form.visits],
    };
    await ehr_icpindia_backend.set_record(updatedForm);
    alert('Record submitted!');
  };

  const handleFetch = async () => {
    const result = await ehr_icpindia_backend.get_record();
    setFetchedRecord(result[0]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Electronic Health Record</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="dob" placeholder="Date of Birth" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <input name="blood_group" placeholder="Blood Group" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="medications" placeholder="Medications (comma separated)" onChange={handleChange} />
      <input name="chronic_conditions" placeholder="Chronic Conditions" onChange={handleChange} />
      <input name="allergies" placeholder="Allergies" onChange={handleChange} />
      <input name="visits" placeholder="Visits" onChange={handleChange} />

      <br /><br />
      <button onClick={handleSubmit}>Submit Record</button>
      <button onClick={handleFetch}>Fetch Record</button>

      {fetchedRecord && (
        <div style={{ marginTop: '20px' }}>
          <h3>Fetched Record:</h3>
          <pre>{JSON.stringify(fetchedRecord, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
