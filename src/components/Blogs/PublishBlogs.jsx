import React, { useState } from "react";
import { postBlog } from "../../actions/blog";
import { connect } from "react-redux";
import propTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishBlogs = ({ postBlog }) => {
  const [formData, setFormData] = useState({
    description: "",
    experimentName: "",
    difficulty: 1,
    subject: "Physics",
    mainImage: "",
    materialList: [
      {
        Name: "",
        quantity: 0,
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        stepDescription: "",
        image: "",
      },
    ],
    safetyPrecautions: "",
  });
  const {
    description,
    experimentName,
    difficulty,
    subject,
    mainImage,
    materialList,
    safetyPrecautions,
    instructions,
  } = formData;
  const navigate = useNavigate()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const postData = async () => {
    console.log("posting data");
    const config = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    const res = await axios.post(
      "/publishblog",
      formData,
      { headers: config }
    );
    setFormData(res.data);
    navigate('/dashboard')
  };
  return (
    <div>
      <h3 style={{ marginLeft: 60 }}>Add Blog Info</h3>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Experiment Name</label>
        <input
          className="form-control"
          type="text"
          value={experimentName}
          name="experimentName"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Description</label>
        <input
          className="form-control"
          type="text"
          value={description}
          name="description"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Difficulty</label>
        <input
          className="form-control"
          type="number"
          value={difficulty}
          name="difficulty"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Subject</label>
        <input
          className="form-control"
          type="text"
          value={subject}
          name="subject"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Upload Image String</label>
        <input
          className="form-control"
          type="text"
          value={mainImage}
          name="mainImage"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
        <label>Safety Precautions</label>
        <input
          className="form-control"
          type="text"
          value={safetyPrecautions}
          name="safetyPrecautions"
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <h3 style={{ marginLeft: 60 }}>Add Materials</h3>
      {materialList.map((material, index) => {
        return (
          <div key={index}>
            <div
              className="form-group"
              style={{ width: "50%", marginLeft: 60 }}
            >
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={material.Name}
                name="Name"
                onChange={(e) => {
                  let newMaterialList = materialList;
                  newMaterialList[index].Name = e.target.value;
                  setFormData({ ...formData, materialList: newMaterialList });
                }}
              />
            </div>
            <div
              className="form-group"
              style={{ width: "50%", marginLeft: 60 }}
            >
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                value={material.quantity}
                name="quantity"
                onChange={(e) => {
                  materialList[index].quantity = e.target.value;
                  setFormData({ ...formData, materialList: materialList });
                }}
              />
            </div>
          </div>
        );
      })}
      <br />
      <button
        className="btn btn-dark  btn-block"
        style={{ marginLeft: 57, maxHeight: 50 }}
        onClick={(e) => {
          materialList.push({
            Name: "",
            quantity: 0,
          });
          setFormData({ ...formData, materialList: materialList });
        }}
      >
        Add Material
      </button>
      <br />
      <br />
      <h3 style={{ marginLeft: 60 }}>Instructions</h3>
      {instructions.map((instruction, index) => (
        <div key={index}>
          <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
            <label>Step Description</label>
            <input
              className="form-control"
              type="text"
              value={instruction.stepDescription}
              name="stepDescription"
              onChange={(e) => {
                instructions[index].stepDescription = e.target.value;
                setFormData({ ...formData, instructions: instructions });
              }}
            />
          </div>
          <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
            <label>Image String</label>
            <input
              type="text"
              className="form-control"
              value={instruction.image}
              name="image"
              onChange={(e) => {
                instructions[index].image = e.target.value;
                setFormData({ ...formData, instructions: instructions });
              }}
            />
          </div>
          <div className="form-group" style={{ width: "50%", marginLeft: 60 }}>
            <label>Step Number</label>
            <input
              type="number"
              className="form-control"
              value={instruction.stepNumber}
              name="stepNumber"
              onChange={(e) => {
                instructions[index].stepNumber = e.target.value;
                setFormData({ ...formData, instructions: instructions });
              }}
            />
          </div>
        </div>
      ))}
      <br />
      <button
        className="btn btn-dark  btn-block"
        style={{ marginLeft: 57, maxHeight: 50 }}
        onClick={(e) => {
          console.log("ins");
          let newInstructions = instructions;
          newInstructions.push({
            stepNumber: "",
            stepDescription: "",
            image: "",
          });
          setFormData({ ...formData, instructions: newInstructions });
        }}
      >
        Add Instructions
      </button>
      <button
        className="btn btn-success  btn-block"
        style={{ marginLeft: 57, maxHeight: 50 }}
        onClick={() => {
          postData();
        }}
      >
        Submit
      </button>
    </div>
  );
};
PublishBlogs.propTypes = {
  postBlog: propTypes.func.isRequired,
};
export default connect(null, { postBlog })(PublishBlogs);
