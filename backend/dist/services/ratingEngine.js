"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCandidateScore = void 0;
const calculateCandidateScore = (yearsExperience, skills, projects) => {
    let score = 0;
    // Experience: base points
    score += yearsExperience * 50;
    // Skills: verified skills weigh more
    skills.forEach(skill => {
        score += skill.proficiencyScore * (skill.isVerified ? 2 : 1);
    });
    // Projects: AI complexity adds heavily
    projects.forEach(project => {
        score += project.aiComplexityScore * 3;
    });
    // Normalization/Cap logic could go here
    if (score < 0)
        score = 0;
    // Determine Tag Based on rating score
    let rankTag = 'Newbie';
    if (score >= 2400)
        rankTag = 'Grandmaster';
    else if (score >= 2100)
        rankTag = 'Master';
    else if (score >= 1900)
        rankTag = 'Candidate Master';
    else if (score >= 1600)
        rankTag = 'Expert';
    else if (score >= 1400)
        rankTag = 'Specialist';
    else if (score >= 1200)
        rankTag = 'Pupil';
    return { score, rankTag };
};
exports.calculateCandidateScore = calculateCandidateScore;
