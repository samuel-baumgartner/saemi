export interface Skill {
  id: string;
  category: string;
  tools: string;
  description: string;
  iconColor: string;
}

export const skills: Skill[] = [
  {
    id: "embedded",
    category: "Embedded & Hardware Systems",
    tools: "Arduino, Raspberry Pi, ESP8266",
    description: "Microcontroller programming, sensor integration, motor control, and wireless communication for embedded robotics applications.",
    iconColor: "text-green-600",
  },
  {
    id: "programming",
    category: "Programming & Software Engineering",
    tools: "C++, Python",
    description: "Efficient algorithm implementation, real-time software architecture, and development of robotics and control systems.",
    iconColor: "text-blue-600",
  },
  {
    id: "ml-ai",
    category: "Machine Learning & AI",
    tools: "TensorFlow, PyTorch, OpenCV",
    description: "Deep learning model development, computer vision pipelines, and integration of AI tools in Python.",
    iconColor: "text-purple-600",
  },
  {
    id: "scientific",
    category: "Scientific Computing & Tools",
    tools: "NumPy, SciPy, Matplotlib",
    description: "Numerical analysis, optimisation routines, and visualisation of scientific data.",
    iconColor: "text-orange-600",
  },
  {
    id: "3d-modeling",
    category: "3D Modeling & Simulation",
    tools: "Blender, Substance Painter, ZBrush, PrusaSlicer",
    description: "Mechanical modelling, texturing, creation of simulation-ready visual and functional assets, and digital fabrication with 3D printing optimisation.",
    iconColor: "text-pink-600",
  },
  {
    id: "control",
    category: "Control & Robotics",
    tools: "PID control, motion planning (RRT*)",
    description: "Design and implementation of control algorithms and sampling-based path planning in Python.",
    iconColor: "text-red-600",
  },
  {
    id: "systems",
    category: "Systems, Linux & Tooling",
    tools: "Git, Linux, Docker, Docker Compose",
    description: "Version control, system administration, shell scripting, and containerisation for engineering workflows. Deployment and maintenance of self-hosted services, including Overleaf and automated TrueNAS backup infrastructure.",
    iconColor: "text-yellow-600",
  },
  {
    id: "documentation",
    category: "Technical Documentation",
    tools: "LaTeX",
    description: "Preparation of technical reports, academic documents, and structured engineering documentation.",
    iconColor: "text-indigo-600",
  },
];
