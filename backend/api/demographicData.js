const express = require("express");
const router = express.Router();
const Opening = require("../models/Opening");
const Student = require("../models/Student");
const College = require("../models/College");

const calculateStatistics = (packages) => {
  const highest = Math.max(...packages);
  const lowest = Math.min(...packages);
  const sum = packages.reduce((acc, pkg) => acc + pkg, 0);
  const average = sum / packages.length;
  const median = packages.sort((a, b) => a - b)[
    Math.floor(packages.length / 2)
  ];
  return { highest, lowest, median, average };
};

// GET /api/stats/yearly
router.get("/", async (req, res) => {
  try {
    // Fetch all students and openings
    let students = await Student.find();
    let openings = await Opening.find();
    let colleges = await College.find();

    // Helper object to track data for each year
    let data = {};

    // Process student data to calculate placed percentage by year
    students.forEach((student) => {
      const year = student.year;
      if (!data[year]) {
        data[year] = { year: year, placed: 0, totalStudents: 0, companies: 0 };
      }
      if (student.placed) {
        data[year].placed++;
      }
    });

    // Process opening data to calculate the number of companies by year
    openings.forEach((opening) => {
      const year = opening.batch;
      if (!data[year]) {
        data[year] = { year: year, placed: 0, totalStudents: 0, companies: 0 };
      }
      data[year].companies++;
    });

    // Process college data to calculate the number of students by year
    colleges.forEach((college) => {
      const en = college.enroll;
      let year = 0;
      if (en.length === 8) {
        let temp = en.slice(0, 2);
        temp = "20" + temp;
        year = parseInt(temp);
        year += 4;
      } else if (en.length === 10) {
        let temp = en.slice(2, 2);
        temp = "20" + temp;
        year = parseInt(temp);
        year += 4;
      }
      if (!data[year]) {
        data[year] = { year: year, placed: 0, totalStudents: 0, companies: 0 };
      }
      data[year].totalStudents++;
    });

    // Calculate placed percentage for each year and format the result
    let result = Object.values(data).map((item) => {
      const placedPercentage =
        item.totalStudents > 0
          ? Math.round((item.placed / item.totalStudents) * 100)
          : 0;
      return {
        year: item.year,
        placed: placedPercentage,
        companies: item.companies,
      };
    });

    // Sort result by year (optional)
    result.sort((a, b) => a.year - b.year);

    // Return the result
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/stats/yearly-details
router.get("/dashboard", async (req, res) => {
  try {
    // Fetch all necessary data
    let students = await Student.find();
    let openings = await Opening.find();
    let colleges = await College.find();

    let yearData = {};
    let data = {};

    // Group the students, openings, and applications by year
    students.forEach((student) => {
      const year = student.year;
      if (!data[year]) {
        data[year] = {
          year,
          placed: 0,
          totalStudents: 0,
          companies: 0,
          packages: [],
          offers: {},
          roles: {},
          month: {},
          companiesList: [],
        };
      }
      if (student.placed) {
        data[year].placed++;
        student.companys.forEach((companyId) => {
          const opening = openings.find(
            (o) => o._id.toString() === companyId.toString()
          );
          if (opening) {
            if (!data[year].offers[opening.name])
              data[year].offers[opening.name] = 0;
            data[year].offers[opening.name]++;
          }
        });
      }
    });

    openings.forEach((opening) => {
      const year = opening.batch;
      const month = opening.date.getMonth();
      const role = opening.role || "Other";
      if (!data[year]) {
        data[year] = {
          year,
          placed: 0,
          totalStudents: 0,
          companies: 0,
          packages: [],
          roles: {},
          month: {},
          companiesList: [],
        };
      }
      if (!data[year].roles[role]) data[year].roles[role] = 0;
      if (!data[year].month[month]) data[year].month[month] = 0;
      data[year].roles[role]++;
      data[year].month[month]++;
      data[year].companies++;
      data[year].packages.push(parseInt(opening.ctc));
      data[year].companiesList.push({
        name: opening.name,
        package: opening.ctc,
        placements: data[year].offers[opening.name] || 0,
        visitDate: opening.date.toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
      });
    });

    colleges.forEach((college) => {
      const en = college.enroll;
      let year = 0;
      if (en.length === 8) {
        let temp = en.slice(0, 2);
        temp = "20" + temp;
        year = parseInt(temp);
        year += 4;
      } else if (en.length === 10) {
        let temp = en.slice(2, 2);
        temp = "20" + temp;
        year = parseInt(temp);
        year += 4;
      }
      if (!data[year]) {
        data[year] = {
          year,
          placed: 0,
          totalStudents: 0,
          companies: 0,
          packages: [],
        };
      }
      data[year].totalStudents++;
    });

    // Construct the final yearData
    for (let year in data) {
      const { highest, lowest, median, average } = calculateStatistics(
        data[year].packages
      );

      yearData[year] = {
        statistics: {
          highest,
          lowest,
          median,
          average,
          topCompanies: Object.entries(data[year].offers).map(
            ([name, offers]) => ({
              name,
              offers,
              package: data[year].companiesList.find((c) => c.name === name)
                .package,
            })
          ),
        },
        placementData: {
          placed: (data[year].placed / data[year].totalStudents) * 100,
          unplaced:
            ((data[year].totalStudents - data[year].placed) /
              data[year].totalStudents) *
            100,
          roles: Object.entries(data[year].roles).map(([name, value]) => ({
            name,
            value,
          })),
          monthWiseCompanies: Object.entries(data[year].month).map(
            ([month, companies]) => ({
              month: new Date(2021, month).toLocaleString("default", {
                month: "short",
              }),
              companies,
            })
          ),
          companiesList: data[year].companiesList,
        },
      };
    }

    // Return the constructed yearData
    res.json(yearData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
