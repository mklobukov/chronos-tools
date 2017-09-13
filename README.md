# Introduction
Command line tool for Chronos.

Install with the following command:
```
npm install -g chronos-tools
```
This will save an executable called chronostools to ```usr/local/bin/```

# Commands
* ```chronostools allinfo```

Prints a table with description of all the jobs. Sample output:
```
┌──────────────────────────────────────┬─────────────┬────────────────┬─────────┬───────────┬────────────────┬───────────────────────────────┐
│ ID                                   │ Name        │ State          │ Status  │ Schedule  │ Times Executed │ Next Scheduled Time           │
├──────────────────────────────────────┼─────────────┼────────────────┼─────────┼───────────┼────────────────┼───────────────────────────────┤
│ e02841ef-88b1-47b0-bf11-5e642e332e86 │ testjob1    │ notschedulable │ success │ 0 * * * * │ 1              │ Tue, 25 Jul 2017 18:55:00 GMT │
├──────────────────────────────────────┼─────────────┼────────────────┼─────────┼───────────┼────────────────┼───────────────────────────────┤
│ 3e794a07-36b8-4794-a173-a95de41541f6 │ testjob2    │ notschedulable │ success │ 0 * * * * │ 2              │ Tue, 25 Jul 2017 18:55:00 GMT │
├──────────────────────────────────────┼─────────────┼────────────────┼─────────┼───────────┼────────────────┼───────────────────────────────┤
```

* ```chronostools info {jobID}```

Prints information for a job with the provided job ID. Sample output:
```
┌──────────────────────────────────────┬─────────────┬────────────────┬─────────┬───────────┬────────────────┬───────────────────────────────┐
│ ID                                   │ Name        │ State          │ Status  │ Schedule  │ Times Executed │ Next Scheduled Time           │
├──────────────────────────────────────┼─────────────┼────────────────┼─────────┼───────────┼────────────────┼───────────────────────────────┤
│ e02841ef-88b1-47b0-bf11-5e642e332e86 │ testjob3    │ notschedulable │ success │ 0 * * * * │ 4              │ Tue, 27 Jul 2017 13:55:00 GMT │
├──────────────────────────────────────┼─────────────┼────────────────┼─────────┼───────────┼────────────────┼───────────────────────────────┤
```

* ```chronostools login```

If an app key and secret are found on your machine, this command will print the token. If not found, it will prompt for app key and secret, save them
to a file, and then print token.

* ```chronostools publish```

Publishes the job with the name provided in your config file.

* ```chronostools remove {jobID}```

Removes the job with provided job ID.

* ```chronostools schedule {filePath}```

Schedules the job with description provided in a JSON file located at {filePath}

* ```chronostools stop {jobID}```

Force stops the job with the provided job ID.

* ```chronostools version```

Prints version of Chronos.
