/*global System */
'use strict';

System.config({
  transpiler: "babel",
  babelOptions: {
    "stage": 2,
  },
  packages: {
    './': { defaultExtension: false }
  },
  map: {
    "react": "npm:react@16.3",
    "react-dom": "npm:react-dom@16.3",
    "react-router": "npm:react-router@4.2",
    "react-router-dom": "npm:react-router-dom@4.2",
    "prop-types": "npm:prop-types@15.6", // issue w/ react-table
    "react-table": "npm:react-table@6.8"
  }
});
