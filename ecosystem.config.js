module.exports = {
    apps : [{
      name: "CipriDev",
      script: 'server.js',
      watch: true,
      ignore_watch: ["node_modules", "db.json", "routes/uploaded"]
    }]
  };
  