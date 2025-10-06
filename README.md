# 🌬️ WindVision

**WindVision** is an interactive web platform designed to support **remote inspection of wind turbines** through a **3D visualization environment**.
The system combines **SCADA data**, **inspection reports**, and **maintenance logs** in a single interface, making turbine analysis more intuitive and accessible to both technical and non-technical users.

---

## 🧭 Overview

WindVision provides a **real-time 3D representation of a wind farm**, allowing users to explore the environment, select turbines, and view detailed information about their operational state.
The platform aims to improve remote inspection workflows by integrating data visualization, alerts, and contextual insights in a lightweight and interactive web experience.

---

## ✨ Key Features

* 🌀 **3D Visualization:** Interactive wind farm built with **Three.js**, including realistic models of turbines created in **Blender**.
* ⚙️ **SCADA Data Integration:** Displays key operational metrics such as wind speed, power output, nacelle direction, rotor speed, and temperatures.
* 🔍 **Inspection Reports:** Loads and visualizes inspection data from structured **JSON files**.
* 🚨 **Alert System:** Automatically highlights turbines with detected anomalies (e.g., high temperature, vibration, or structural stress).
* 🧾 **Metadata and Logs:** Shows maintenance history, event logs, and uptime information.
* 💬 **Annotations:** Allows adding contextual notes to turbines for future analysis.
* 🧭 **Interactive Controls:** Users can navigate the 3D scene using keyboard (WSAD) and mouse, zooming into turbines for detailed inspection.

---

## 🧰 Tech Stack

* **Frontend:** React, TypeScript, Three.js, styled-components
* **3D Modeling:** Blender
* **Data Format:** JSON
* **Build Tools:** Vite / Webpack
* **Version Control:** Git & GitHub

---

## 🧩 Project Structure

```
windvision/
├── src/
│   ├── components/
│   │   ├── SceneCanvas/
│   │   ├── CreateInspectionForm/
│   │   └── ModalInspectionView/
│   ├── assets/
│   ├── data/
│   ├── styles/
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/majudlorenzoni/windvision
   cd windvision
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 📊 Example JSON Input

Users can upload a custom inspection JSON to visualize turbine data.
Example structure:

```json
{
  "inspection": {
    "date": "2025-05-12",
    "turbines": [
      {
        "id": 1,
        "scada": {
          "windSpeed": 12.4,
          "power": 1450,
          "temperature": 65
        },
        "metadata": {
          "uptime": "98%",
          "energyGenerated": "450 MWh"
        },
        "logs": ["High nacelle temperature detected"],
        "annotations": ["Check cooling system"]
      }
    ]
  }
}
```

---

## 🎯 Purpose

This project was developed as part of the **Bachelor’s Thesis in Computer Science** at **Universidade Federal de Pelotas (UFPel)**.
Its goal is to demonstrate how **interactive 3D interfaces** can enhance **remote monitoring and maintenance** in renewable energy systems, offering a more visual and accessible understanding of turbine data.

---

## 👩‍💻 Author

**Maria Júlia Lorenzoni**
🎓 B.Sc. in Computer Science – UFPel
💼 Front-End Developer | React | TypeScript | 3D Visualization
🔗 [LinkedIn](https://www.linkedin.com/in/majudlorenzoni)
📧 [juliamaria892@gmail.com](mailto:juliamaria892@gmail.com)

---

## 🖼️ Screenshots

![Turbine Modal](https://github.com/majudlorenzoni/windfarm-inspection/blob/main/windfarm-inspection/public/img/Captura%20de%20tela%202025-07-19%20202035.png)

![Turbine Modal](https://github.com/majudlorenzoni/windfarm-inspection/blob/main/windfarm-inspection/public/img/Captura%20de%20tela%202025-07-19%20202241.png)

---
