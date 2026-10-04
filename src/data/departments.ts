import { Department, AcademicYear, Semester, Subject } from '../types';

export const departments: Department[] = [
  {
    id: 'dept-extc',
    name: 'Electronics Engineering',
    shortName: 'EXTC',
    icon: 'cpu',
    color: '#C66B4E',
    description: 'Focuses on electronic circuits, devices, signals, and advanced communication systems.',
    hod: 'Dr. Ramesh R. (Ph.D., IIT Bombay)',
    totalStudents: 240,
    years: [
      {
        id: 'extc-yr1',
        name: 'First Year',
        year: 1,
        semesters: [
          {
            id: 'extc-sem1',
            name: 'Semester I',
            number: 1,
            subjects: [
              { id: 'subj-extc-m1', name: 'Applied Mathematics I', code: 'MATH101', credits: 4, departmentId: 'dept-extc', semester: 1, year: 1, description: 'Linear algebra, matrices, differential calculus, and partial differentiation.' },
              { id: 'subj-extc-p1', name: 'Engineering Physics I', code: 'PHY101', credits: 3, departmentId: 'dept-extc', semester: 1, year: 1, description: 'Quantum mechanics, crystallography, and semiconductor fundamentals.' },
              { id: 'subj-extc-b1', name: 'Basic Electrical Engineering', code: 'ELEC101', credits: 4, departmentId: 'dept-extc', semester: 1, year: 1, description: 'DC/AC circuits, magnetic circuits, single & three-phase systems, transformers.' },
              { id: 'subj-extc-c1', name: 'Engineering Chemistry I', code: 'CHEM101', credits: 3, departmentId: 'dept-extc', semester: 1, year: 1, description: 'Water technology, polymers, fuels, and engineering materials.' }
            ]
          },
          {
            id: 'extc-sem2',
            name: 'Semester II',
            number: 2,
            subjects: [
              { id: 'subj-extc-m2', name: 'Applied Mathematics II', code: 'MATH102', credits: 4, departmentId: 'dept-extc', semester: 2, year: 1, description: 'Multiple integrals, vector calculus, gamma and beta functions.' },
              { id: 'subj-extc-p2', name: 'Engineering Physics II', code: 'PHY102', credits: 3, departmentId: 'dept-extc', semester: 2, year: 1, description: 'Electrodynamics, lasers, optical fibers, and superconductivity.' },
              { id: 'subj-extc-ed', name: 'Engineering Drawing & CAD', code: 'MECH102', credits: 3, departmentId: 'dept-extc', semester: 2, year: 1, description: 'Orthographic projections, isometric views, sectioning, and AutoCAD modeling.' },
              { id: 'subj-extc-prog', name: 'C Programming for Engineers', code: 'COMP102', credits: 3, departmentId: 'dept-extc', semester: 2, year: 1, description: 'Structured programming, pointers, file structures, and data handling.' }
            ]
          }
        ]
      },
      {
        id: 'extc-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'extc-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-extc-1', name: 'Analog Electronics', code: 'EXTC201', credits: 4, departmentId: 'dept-extc', semester: 3, year: 2, description: 'BJT & MOSFET biasing, small-signal models, multistage amplifiers, and feedback topologies.' },
              { id: 'subj-extc-2', name: 'Digital Electronics', code: 'EXTC202', credits: 4, departmentId: 'dept-extc', semester: 3, year: 2, description: 'Boolean algebra, combinational logic design, synchronous & asynchronous sequential state machines.' },
              { id: 'subj-extc-3', name: 'Network Theory', code: 'EXTC203', credits: 3, departmentId: 'dept-extc', semester: 3, year: 2, description: 'Mesh/Nodal analysis, network theorems, transient response, Laplace transforms, two-port networks.' },
              { id: 'subj-extc-4', name: 'Electronic Devices & Circuits', code: 'EXTC204', credits: 3, departmentId: 'dept-extc', semester: 3, year: 2, description: 'Semiconductor physics, p-n junction capacitance, Schottky diodes, JFET, and power devices.' },
              { id: 'subj-extc-5', name: 'Signals and Systems', code: 'EXTC205', credits: 4, departmentId: 'dept-extc', semester: 3, year: 2, description: 'LTI systems, continuous & discrete Fourier transforms, Laplace & Z-transform analysis.' }
            ]
          },
          {
            id: 'extc-sem4',
            name: 'Semester IV',
            number: 4,
            subjects: [
              { id: 'subj-extc-6', name: 'Microprocessors & Microcontrollers', code: 'EXTC206', credits: 4, departmentId: 'dept-extc', semester: 4, year: 2, description: '8086 architecture, assembly language, memory interfacing, and 8051 embedded programming.' },
              { id: 'subj-extc-7', name: 'Principles of Communication Systems', code: 'EXTC207', credits: 4, departmentId: 'dept-extc', semester: 4, year: 2, description: 'Amplitude modulation, frequency modulation, phase locked loops, and noise analysis.' },
              { id: 'subj-extc-8', name: 'Linear Control Systems', code: 'EXTC208', credits: 3, departmentId: 'dept-extc', semester: 4, year: 2, description: 'Transfer functions, block diagram algebra, Routh-Hurwitz, root locus, Bode & Nyquist stability.' },
              { id: 'subj-extc-9', name: 'Electromagnetic Engineering', code: 'EXTC209', credits: 4, departmentId: 'dept-extc', semester: 4, year: 2, description: 'Maxwell equations, Poynting theorem, transmission lines, and wave reflection.' }
            ]
          }
        ]
      },
      {
        id: 'extc-yr3',
        name: 'Third Year',
        year: 3,
        semesters: [
          {
            id: 'extc-sem5',
            name: 'Semester V',
            number: 5,
            subjects: [
              { id: 'subj-extc-10', name: 'Digital Signal Processing (DSP)', code: 'EXTC301', credits: 4, departmentId: 'dept-extc', semester: 5, year: 3, description: 'DFT, FFT algorithms, IIR and FIR digital filter design, finite word-length effects.' },
              { id: 'subj-extc-11', name: 'Digital Communication', code: 'EXTC302', credits: 4, departmentId: 'dept-extc', semester: 5, year: 3, description: 'PCM, DPCM, QPSK, QAM, matched filters, inter-symbol interference, and error control coding.' },
              { id: 'subj-extc-12', name: 'VLSI Design Methodology', code: 'EXTC303', credits: 4, departmentId: 'dept-extc', semester: 5, year: 3, description: 'CMOS inverter DC characteristics, dynamic CMOS, layout rules, and Verilog HDL design.' }
            ]
          },
          {
            id: 'extc-sem6',
            name: 'Semester VI',
            number: 6,
            subjects: [
              { id: 'subj-extc-13', name: 'Antenna & Microwave Engineering', code: 'EXTC304', credits: 4, departmentId: 'dept-extc', semester: 6, year: 3, description: 'Antenna radiation patterns, dipoles, microstrip patch antennas, waveguides, and radar.' },
              { id: 'subj-extc-14', name: 'Embedded System Architecture', code: 'EXTC305', credits: 3, departmentId: 'dept-extc', semester: 6, year: 3, description: 'ARM Cortex-M processors, RTOS concepts, task scheduling, and peripheral protocols (SPI, I2C).' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-comp',
    name: 'Computer Engineering',
    shortName: 'COMP',
    icon: 'monitor',
    color: '#183D32',
    description: 'Study of algorithms, data structures, cloud architectures, cybersecurity, and software engineering.',
    hod: 'Dr. Neha S. (Ph.D., IIT Delhi)',
    totalStudents: 300,
    years: [
      {
        id: 'comp-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'comp-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-comp-1', name: 'Data Structures and Algorithms', code: 'COMP201', credits: 4, departmentId: 'dept-comp', semester: 3, year: 2, description: 'Linear & non-linear structures, AVL trees, graphs, sorting, searching, and complexity bounds.' },
              { id: 'subj-comp-2', name: 'Operating System Concepts', code: 'COMP202', credits: 4, departmentId: 'dept-comp', semester: 3, year: 2, description: 'Process synchronization, thread scheduling, deadlocks, paging, virtual memory, and file systems.' },
              { id: 'subj-comp-3', name: 'Database Management Systems (DBMS)', code: 'COMP203', credits: 4, departmentId: 'dept-comp', semester: 3, year: 2, description: 'Relational algebra, SQL, normalization (1NF-BCNF), transaction ACID properties, and indexing.' },
              { id: 'subj-comp-4', name: 'Computer Networks', code: 'COMP204', credits: 4, departmentId: 'dept-comp', semester: 3, year: 2, description: 'TCP/IP and OSI stack, routing protocols, flow & congestion control, socket programming.' },
              { id: 'subj-comp-5', name: 'Discrete Mathematics', code: 'COMP205', credits: 3, departmentId: 'dept-comp', semester: 3, year: 2, description: 'Set theory, propositional logic, relations, graph theory, combinatorics, and algebraic structures.' }
            ]
          },
          {
            id: 'comp-sem4',
            name: 'Semester IV',
            number: 4,
            subjects: [
              { id: 'subj-comp-6', name: 'Theory of Computation', code: 'COMP206', credits: 4, departmentId: 'dept-comp', semester: 4, year: 2, description: 'Finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines.' },
              { id: 'subj-comp-7', name: 'Software Engineering & Agile', code: 'COMP207', credits: 3, departmentId: 'dept-comp', semester: 4, year: 2, description: 'Software life cycles, UML modeling, Scrum, CI/CD pipelines, automated testing.' },
              { id: 'subj-comp-8', name: 'Computer Organization & Architecture', code: 'COMP208', credits: 4, departmentId: 'dept-comp', semester: 4, year: 2, description: 'ALU design, pipelining, cache memory hierarchy, superscalar processors, and RISC-V.' }
            ]
          }
        ]
      },
      {
        id: 'comp-yr3',
        name: 'Third Year',
        year: 3,
        semesters: [
          {
            id: 'comp-sem5',
            name: 'Semester V',
            number: 5,
            subjects: [
              { id: 'subj-comp-9', name: 'Artificial Intelligence', code: 'COMP301', credits: 4, departmentId: 'dept-comp', semester: 5, year: 3, description: 'Heuristic search algorithms, adversarial game playing, knowledge representation, Bayesian nets.' },
              { id: 'subj-comp-10', name: 'Web Technology & Frameworks', code: 'COMP302', credits: 3, departmentId: 'dept-comp', semester: 5, year: 3, description: 'Modern web architectures, React, Node.js REST APIs, MongoDB, authentication, and state management.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-elec',
    name: 'Electrical Engineering',
    shortName: 'ELEC',
    icon: 'zap',
    color: '#D7AA48',
    description: 'Power generation, high-voltage grids, electric drives, smart grid technology, and renewable systems.',
    hod: 'Dr. Vivek K. (Ph.D., IIT Madras)',
    totalStudents: 180,
    years: [
      {
        id: 'elec-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'elec-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-elec-1', name: 'Electrical Machines I', code: 'ELEC201', credits: 4, departmentId: 'dept-elec', semester: 3, year: 2, description: 'DC generators, DC motors, single-phase and three-phase transformers.' },
              { id: 'subj-elec-2', name: 'Power Electronics', code: 'ELEC202', credits: 4, departmentId: 'dept-elec', semester: 3, year: 2, description: 'SCR, MOSFET, IGBT devices, phase-controlled rectifiers, DC-DC buck/boost converters.' },
              { id: 'subj-elec-3', name: 'Electrical Measurements & Instrumentation', code: 'ELEC203', credits: 3, departmentId: 'dept-elec', semester: 3, year: 2, description: 'Bridges, energy meters, digital storage oscilloscopes, and smart sensor transducers.' },
              { id: 'subj-elec-4', name: 'Electromagnetic Fields', code: 'ELEC204', credits: 3, departmentId: 'dept-elec', semester: 3, year: 2, description: 'Electrostatics, magnetostatics, boundary value problems, and time-varying fields.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-it',
    name: 'Information Technology',
    shortName: 'IT',
    icon: 'globe',
    color: '#A9A0C2',
    description: 'IT infrastructure, cloud engineering, cybersecurity, DevOps pipelines, and enterprise systems.',
    hod: 'Dr. Anita P. (Ph.D., IIT Roorkee)',
    totalStudents: 240,
    years: [
      {
        id: 'it-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'it-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-it-1', name: 'Data Structures & Analysis', code: 'IT201', credits: 4, departmentId: 'dept-it', semester: 3, year: 2, description: 'Algorithmic paradigms, dynamic programming, greedy methods, and tree structures.' },
              { id: 'subj-it-2', name: 'Database Systems & SQL', code: 'IT202', credits: 4, departmentId: 'dept-it', semester: 3, year: 2, description: 'Relational data modeling, query optimization, NoSQL concepts, and transaction protocols.' },
              { id: 'subj-it-3', name: 'Object Oriented Programming with Java', code: 'IT203', credits: 3, departmentId: 'dept-it', semester: 3, year: 2, description: 'Encapsulation, inheritance, polymorphism, multithreading, exception handling, and JDBC.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-aiml',
    name: 'AI and Machine Learning',
    shortName: 'AIML',
    icon: 'brain',
    color: '#6B8F71',
    description: 'Artificial intelligence, deep neural networks, computer vision, robotics, and natural language understanding.',
    hod: 'Dr. Sanjay M. (Ph.D., IISc Bangalore)',
    totalStudents: 120,
    years: [
      {
        id: 'aiml-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'aiml-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-aiml-1', name: 'Foundations of Machine Learning', code: 'AIML201', credits: 4, departmentId: 'dept-aiml', semester: 3, year: 2, description: 'Linear regression, logistic regression, SVMs, decision trees, random forests, and k-means.' },
              { id: 'subj-aiml-2', name: 'Probability & Statistics for AI', code: 'AIML202', credits: 4, departmentId: 'dept-aiml', semester: 3, year: 2, description: 'Random variables, probability distributions, hypothesis testing, Bayesian inference.' },
              { id: 'subj-aiml-3', name: 'Python for Data Science', code: 'AIML203', credits: 3, departmentId: 'dept-aiml', semester: 3, year: 2, description: 'NumPy, Pandas, Matplotlib, Scikit-Learn, data cleaning, and statistical visualizations.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-mech',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    icon: 'settings',
    color: '#8B7355',
    description: 'Thermal engineering, fluid mechanics, CAD/CAM manufacturing, robotics, and automotive technology.',
    hod: 'Dr. Prakash D. (Ph.D., IIT Kharagpur)',
    totalStudents: 180,
    years: [
      {
        id: 'mech-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'mech-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-mech-1', name: 'Engineering Thermodynamics', code: 'MECH201', credits: 4, departmentId: 'dept-mech', semester: 3, year: 2, description: 'Laws of thermodynamics, Carnot cycle, entropy, steam properties, and Rankine cycles.' },
              { id: 'subj-mech-2', name: 'Strength of Materials', code: 'MECH202', credits: 4, departmentId: 'dept-mech', semester: 3, year: 2, description: 'Stresses and strains, shear force & bending moment diagrams, torsion of circular shafts.' },
              { id: 'subj-mech-3', name: 'Manufacturing Processes', code: 'MECH203', credits: 3, departmentId: 'dept-mech', semester: 3, year: 2, description: 'Metal casting, welding processes, sheet metal operations, and lathe operations.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    icon: 'building',
    color: '#5B7B8A',
    description: 'Structural design, geotechnical analysis, transportation planning, hydraulics, and environmental sustainability.',
    hod: 'Dr. Amit V. (Ph.D., IIT Kanpur)',
    totalStudents: 120,
    years: [
      {
        id: 'civil-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'civil-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-civil-1', name: 'Structural Analysis I', code: 'CIVIL201', credits: 4, departmentId: 'dept-civil', semester: 3, year: 2, description: 'Determinate trusses, cables, arches, influence lines, and deflection of beams.' },
              { id: 'subj-civil-2', name: 'Surveying & Geomatics', code: 'CIVIL202', credits: 4, departmentId: 'dept-civil', semester: 3, year: 2, description: 'Theodolite surveying, leveling, contouring, curves, and electronic total stations.' },
              { id: 'subj-civil-3', name: 'Fluid Mechanics', code: 'CIVIL203', credits: 3, departmentId: 'dept-civil', semester: 3, year: 2, description: 'Hydrostatic pressure, buoyancy, continuity, Bernoulli theorem, and pipe flow.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-text',
    name: 'Textile Technology',
    shortName: 'TEXT',
    icon: 'scissors',
    color: '#C4956A',
    description: 'Yarn manufacturing, fabric weaving, chemical processing, technical textiles, and fashion tech.',
    hod: 'Dr. Sujata T. (Ph.D., VJTI)',
    totalStudents: 60,
    years: [
      {
        id: 'text-yr2',
        name: 'Second Year',
        year: 2,
        semesters: [
          {
            id: 'text-sem3',
            name: 'Semester III',
            number: 3,
            subjects: [
              { id: 'subj-text-1', name: 'Fiber Science & Technology', code: 'TEXT201', credits: 4, departmentId: 'dept-text', semester: 3, year: 2, description: 'Natural and synthetic polymer fibers, physical testing, and morphology.' },
              { id: 'subj-text-2', name: 'Yarn Manufacture I', code: 'TEXT202', credits: 4, departmentId: 'dept-text', semester: 3, year: 2, description: 'Blow room operations, carding principles, and draw frame mechanisms.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-math',
    name: 'Mathematics Department',
    shortName: 'MATH',
    icon: 'calculator',
    color: '#7A6FA0',
    description: 'Foundational and advanced mathematical methods for engineering analysis and simulation.',
    hod: 'Dr. Meena N. (Ph.D., TIFR)',
    totalStudents: 50,
    years: [
      {
        id: 'math-yr1',
        name: 'First Year',
        year: 1,
        semesters: [
          {
            id: 'math-sem1',
            name: 'Semester I',
            number: 1,
            subjects: [
              { id: 'subj-math-1', name: 'Engineering Mathematics I', code: 'MATH101', credits: 4, departmentId: 'dept-math', semester: 1, year: 1, description: 'Differential equations, complex numbers, hyperbolic functions, and linear systems.' }
            ]
          },
          {
            id: 'math-sem2',
            name: 'Semester II',
            number: 2,
            subjects: [
              { id: 'subj-math-2', name: 'Engineering Mathematics II', code: 'MATH102', credits: 4, departmentId: 'dept-math', semester: 2, year: 1, description: 'Vector calculus, line & surface integrals, Green, Gauss, and Stokes theorems.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-phy',
    name: 'Physics Department',
    shortName: 'PHY',
    icon: 'atom',
    color: '#5A8F7B',
    description: 'Applied physics, semiconductor devices, quantum optics, laser technology, and materials science.',
    hod: 'Dr. Rajeev J. (Ph.D., BARC)',
    totalStudents: 40,
    years: [
      {
        id: 'phy-yr1',
        name: 'First Year',
        year: 1,
        semesters: [
          {
            id: 'phy-sem1',
            name: 'Semester I',
            number: 1,
            subjects: [
              { id: 'subj-phy-1', name: 'Applied Physics I', code: 'PHY101', credits: 3, departmentId: 'dept-phy', semester: 1, year: 1, description: 'Interference, diffraction, thin films, ultrasonic waves, and crystal structure.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept-chem',
    name: 'Chemistry Department',
    shortName: 'CHEM',
    icon: 'flask-conical',
    color: '#8B6B5A',
    description: 'Environmental chemistry, industrial polymers, corrosion engineering, lubricants, and energy storage.',
    hod: 'Dr. Aarti L. (Ph.D., ICT Mumbai)',
    totalStudents: 40,
    years: [
      {
        id: 'chem-yr1',
        name: 'First Year',
        year: 1,
        semesters: [
          {
            id: 'chem-sem1',
            name: 'Semester I',
            number: 1,
            subjects: [
              { id: 'subj-chem-1', name: 'Applied Chemistry I', code: 'CHEM101', credits: 3, departmentId: 'dept-chem', semester: 1, year: 1, description: 'Water treatment, hard water softening, corrosion mechanisms, and phase rule.' }
            ]
          }
        ]
      }
    ]
  }
];
