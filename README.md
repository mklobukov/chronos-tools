# Introduction
Command line tool for Chronos.

Install with the following command:
```
npm install -g chronos-tools
```
This will save an executable called chronostools to ```usr/local/bin/```

# Configs and authorization
The default config file (default_config.json) included in the project contains:
* Path to the file with app key and secret (cannot be overridden)
* AUM and Chronos URLs (can be overridden)

To override AUM and Chronos URLs, as well as to provide Docker credentials, place a file called ```config.json``` in ```~/.chronos/```. Refer to ```sample_custom_config.json``` to see what goes into this config file.

If you do not wish to override default localhost AUM and Chronos URLs, do not include the corresponding fields in your custom config.json

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
to ```~/.chronos/credentials.json``` and then print token.

* ```chronostools publish```

Publishes the job with the name provided in your custom config file in ```~/.chronos/```

* ```chronostools remove {jobID}```

Removes the job with provided job ID. Sample output:
```
Removed the job with job ID: e812b3b3-62e1-4df6-90ab-63b5ed55ded9
```

* ```chronostools schedule {filePath}```

Schedules the job with description provided in a JSON file located at {filePath}

Job description file needs to have the following format:
```
{
  "version": "1.0.0",
  "name": "your_job_name",
  "schedule": "0 * * * *",
  "repeat": 0,
  "callback": "http://localhost:3007/jobcallback/uno",
  "check_in_threshold": 240,
  "arguments": "{\"arg1\": 500}"
}
```
Refer to Chronos documentation for explanation of each field.

* ```chronostools stop {jobID}```

Force stops the job with the provided job ID. Sample output:

```
Force stopped the job with job ID:  e812b3b3-62e1-4df6-90ab-63b5ed55ded9
```

* ```chronostools version```

Prints version of Chronos. Sample output:

```
Chronos Server 0.0.1
```
