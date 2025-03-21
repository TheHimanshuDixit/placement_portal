const Opening = require("../models/Opening");
const Student = require("../models/Student");
const College = require("../models/College");
const { calculateStatistics } = require("../utils/calculateStatistics");

const getYearlyStatistics = async (req, res) => {
  try {
    const students = await Student.find();
    const openings = await Opening.find();
    const colleges = await College.find();
    let data = {};

    students.forEach((student) => {
      const year = student.year;
      if (!data[year]) {
        data[year] = { year, placed: 0, totalStudents: 0, companies: 0 };
      }
      if (student.placed) data[year].placed++;
    });

    openings.forEach((opening) => {
      const year = opening.batch;
      if (!data[year]) {
        data[year] = { year, placed: 0, totalStudents: 0, companies: 0 };
      }
      data[year].companies++;
    });

    colleges.forEach((college) => {
      const enroll = college.enroll;
      let year =
        enroll.length === 8
          ? parseInt(`20${enroll.slice(0, 2)}`) + 4
          : parseInt(`20${enroll.slice(2, 2)}`) + 4;
      if (!data[year]) {
        data[year] = { year, placed: 0, totalStudents: 0, companies: 0 };
      }
      data[year].totalStudents++;
    });

    const result = Object.values(data)
      .map((item) => ({
        year: item.year,
        placed:
          item.totalStudents > 0
            ? Math.round((item.placed / item.totalStudents) * 100)
            : 0,
        companies: item.companies,
      }))
      .sort((a, b) => a.year - b.year);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getDashboardStatistics = async (req, res) => {
  try {
    const students = await Student.find();
    const openings = await Opening.find();
    const colleges = await College.find();
    let data = {},
      yearData = {};

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
            data[year].offers[opening.name] =
              (data[year].offers[opening.name] || 0) + 1;
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
      data[year].roles[role] = (data[year].roles[role] || 0) + 1;
      data[year].month[month] = (data[year].month[month] || 0) + 1;
      data[year].companies++;
      data[year].packages.push(parseInt(opening.ctc));
      data[year].companiesList.push({
        name: opening.name,
        package: opening.ctc,
        placements: data[year].offers[opening.name] || 0,
        visitDate: opening.date.toISOString().split("T")[0],
      });
    });

    colleges.forEach((college) => {
      const enroll = college.enroll;
      let year =
        enroll.length === 8
          ? parseInt(`20${enroll.slice(0, 2)}`) + 4
          : parseInt(`20${enroll.slice(2, 2)}`) + 4;
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

    res.json(yearData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getYearlyStatistics, getDashboardStatistics };
