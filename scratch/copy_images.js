const fs = require('fs');
const files = [
  ['C:/Users/medoh/.gemini/antigravity-ide/brain/91d6c020-0bed-4687-aa52-149c4ce91249/linguistic_rules_1791364438007.jpg', 'c:/Users/medoh/Downloads/Coding/Social Icons/MedoHamdani.github.io/Images/blog/15-linguistic-rules.jpg'],
  ['C:/Users/medoh/.gemini/antigravity-ide/brain/91d6c020-0bed-4687-aa52-149c4ce91249/post_war_yemen_1791364450507.jpg', 'c:/Users/medoh/Downloads/Coding/Social Icons/MedoHamdani.github.io/Images/blog/post-war-yemen.jpg'],
  ['C:/Users/medoh/.gemini/antigravity-ide/brain/91d6c020-0bed-4687-aa52-149c4ce91249/teacher_types_1791364462851.jpg', 'c:/Users/medoh/Downloads/Coding/Social Icons/MedoHamdani.github.io/Images/blog/teacher-types.jpg'],
  ['C:/Users/medoh/.gemini/antigravity-ide/brain/91d6c020-0bed-4687-aa52-149c4ce91249/ibn_al_muqaffa_1791364512158.jpg', 'c:/Users/medoh/Downloads/Coding/Social Icons/MedoHamdani.github.io/Images/blog/ibn-al-muqaffa.jpg'],
  ['C:/Users/medoh/.gemini/antigravity-ide/brain/91d6c020-0bed-4687-aa52-149c4ce91249/virtue_of_teacher_1791364525074.jpg', 'c:/Users/medoh/Downloads/Coding/Social Icons/MedoHamdani.github.io/Images/blog/virtue-of-teacher.jpg']
];

for (const [src, dest] of files) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied to', dest);
  }
}
