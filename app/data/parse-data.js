// Parse the data from the database (allequipment.json) and put it in the right format

const fs = require('fs');

// Quick function to turn a name into a slug-style ID
const slugify = a => a.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');

// Parse the data from the JSON source
const raw = fs.readFileSync(`${__dirname}/allequipment.json`, 'utf-8');
const data = JSON.parse(raw);

// Find all of the different equipment types mentioned in the database
const typeNames = data.map(i => i.type);
const uniqueTypeNames = typeNames.filter((t, i) => i === typeNames.indexOf(t));

// Assign an increasing ID to each category seen in the data
const categories = data.map(i => i.cat)
const uniqCat = categories.filter((c, i) => i === categories.indexOf(c));
const categoryIds = Object.fromEntries(uniqCat.map((c, i) => [c, i]));

// Generate the final data format, a list of equipmentTypes.
const processed = uniqueTypeNames.map((typeName) => {
  // An example equipment item, from the data, that has the equipment type
  // we're concerned with.
  const example = data.find(({ type }) => type === typeName);

  return {
    name: typeName,
    slug: slugify(typeName),
    category: {
      name: example.cat,
      slug: slugify(example.cat),
      id: categoryIds[example.cat],
    },
    // How many of the equipment items in the db have this type?
    total_count: typeNames.filter(t => t === typeName).length,
    image: null,
  };
});

// Write that data back into a JSON file
fs.writeFileSync(`${__dirname}/equipment-types.json`, JSON.stringify(processed, null, 2));
