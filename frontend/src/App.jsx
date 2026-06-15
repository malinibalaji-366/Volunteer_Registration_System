import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login";

function App() {
  const [volunteers, setVolunteers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    skills: "",
    availability: "Flexible",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ auth helper
  const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};      

  // ✅ check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // ✅ fetch volunteers
  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/volunteers",
        getAuthConfig()
      );
      setVolunteers(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchVolunteers();
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ add
  const addVolunteer = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/volunteers/add",
        {
          ...form,
          skills: form.skills.split(","),
        },
        getAuthConfig()
      );

      fetchVolunteers();

      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        skills: "",
        availability: "Flexible",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ delete
  const deleteVolunteer = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/volunteers/${id}`,
        getAuthConfig()
      );
      fetchVolunteers();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ edit setup
  const openEdit = (v) => {
    setEditMode(true);
    setSelectedId(v._id);
    setForm({
      name: v.name,
      email: v.email,
      phone: v.phone,
      age: v.age,
      skills: v.skills.join(","),
      availability: v.availability,
    });
  };

  // ✅ update
  const updateVolunteer = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/volunteers/${selectedId}`,
        {
          ...form,
          skills: form.skills.split(","),
        },
        getAuthConfig()
      );

      setEditMode(false);
      setSelectedId(null);
      fetchVolunteers();
    } catch (err) {
      console.log(err);
    }
  };
const downloadCSV = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/reports/csv",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "volunteers-report.csv");

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.log(err);
  }
};
  // 🔐 login gate
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="container">
      <h1>Volunteer Dashboard</h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      >
        Logout
      </button>

      {/* FORM */}
      <form onSubmit={editMode ? updateVolunteer : addVolunteer}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills" />

        <select name="availability" value={form.availability} onChange={handleChange}>
          <option value="Flexible">Flexible</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
        </select>

        <button type="submit">
          {editMode ? "Update" : "Add"}
        </button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th>
            <th>Age</th><th>Skills</th><th>Availability</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {volunteers.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td>{v.age}</td>
              <td>{v.skills?.join(", ")}</td>
              <td>{v.availability}</td>
              <td>
                <button onClick={() => openEdit(v)}>Edit</button>
                <button onClick={() => deleteVolunteer(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadCSV}>Download CSV Report</button>
    </div>
  );
}

export default App;