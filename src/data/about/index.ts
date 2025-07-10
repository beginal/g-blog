import projectData from './projectData.json';
import personalData from './personalData.json';
import experienceData from './experienceData.json';
import educationData from './educationData.json';
import techStackData from './techStackData.json';

const aboutData = {
  projects: projectData,
  personal: personalData.personalInfo,
  experiences: experienceData,
  education: educationData,
  techStack: techStackData,
} as const;

export default aboutData;

// Individual exports for backward compatibility
export { projectData, personalData, experienceData, educationData, techStackData };