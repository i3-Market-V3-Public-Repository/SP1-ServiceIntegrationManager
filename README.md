<!---
#  Copyright 2020-2022 i3-MARKET Consortium:
#
#  ATHENS UNIVERSITY OF ECONOMICS AND BUSINESS - RESEARCH CENTER
#  ATOS SPAIN SA
#  EUROPEAN DIGITAL SME ALLIANCE
#  GFT ITALIA SRL
#  GUARDTIME OU
#  HOP UBIQUITOUS SL
#  IBM RESEARCH GMBH
#  IDEMIA FRANCE
#  SIEMENS AKTIENGESELLSCHAFT
#  SIEMENS SRL
#  TELESTO TECHNOLOGIES PLIROFORIKIS KAI EPIKOINONION EPE
#  UNIVERSITAT POLITECNICA DE CATALUNYA
#  UNPARALLEL INNOVATION LDA
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
-->

# i3-MARKET Service Integration Manager

This software integrates the described services of many OAS files into a single i3-MARKET Backplane API 

## Getting started / Use


The manager can be run using [Dart](https://dart.dev) (available [here](https://dart.dev/get-dart)) or with [Docker](https://www.docker.com/).

## Features

* Add `x-skip-auth` boolean attribute inside your OAS file to skip the custom authorization layer applied by
the integrator:
  ````json
  {
    "info": {
      "description": "The API of the i3Market Open ID Connect provider.",
      "version": "1.0.0",
      "title": "i3-market Open ID Connect API",
      "x-skip-auth": true
    },
    ...
  }
  ````

### Running with Dart

To run the manager using Dart, clone the project, and from the project root run the following command to get all the 
necessary dependencies:

```shell script
dart pub get
```
After that, you have 3 scripts available:

- Interactive  
  Integrates a single service interactively
  ```shell
  dart ./bin/integrate.dart
  ```
- Non-interactive  
  Integrates a single service non-interactively (overriding if necessary)  
  The name of the OAS file is taken as the service name (e.g. `auditableAccounting.json` &rarr; Auditable Accounting Service)
  ```shell
  dart ./bin/single_integrator.dart /path/to/backplane /path/to/spec.json
  ```  
- Non-interactive bulk  
  Integrates several service non-interactively (overriding if necessary)  
  All the JSON files in the given directory will be treated as OAS and integrated.  
  The name of each OAS file is taken as the service name (e.g. `auditableAccounting.json` &rarr; Auditable Accounting Service)
  ```shell
  dart ./bin/bulk_integrator.dart /path/to/backplane /path/to/spec/directory
  ```  
  

### Running with Docker

A docker image of the integrator (single non-interactive) is provided to test the integration during subsystem development.

```shell
docker login registry.gitlab.com
docker run --pull -v /path/to/backplane:/backplane -v /path/to/spec.json:/serviceName.json registry.gitlab.com/i3-market/code/wp4/service-integration-manager:latest /serviceName.json
```
Note that 3 parts of the command have to be changed:  
- Backplane volume (string after first `-v`)  
  Change the first part (`/path/to/backplane`) with the actual path to backplane project (e.g. `C:/Development/i3Market/backplane:/backplane`)

- Specification volume (string after second `-v`)  
  Change the first part (`/path/to/spec.json`) with the actual path to the OAS file  (e.g. `C:/Development/i3Market/specs/greeter.json`)
  Change the filename of the second part (`serviceName` in `/serviceName.json`) with the name of the service (e.g. `/greeter.json`)  
  
- Parameter (last string)  
  Change with the second part of the specification volume (e.g. `/greeter.json`)

Example:
```shell
docker login registry.gitlab.com
docker run --pull -v C:/Development/i3Market/backplane:/backplane -v C:/Development/i3Market/specs/greeter.json:/greeter.json registry.gitlab.com/i3-market/code/wp4/service-integration-manager:latest /greeter.json
```

## How to build, install, or deploy it

### Prerequisites

- [Loopback 4](https://loopback.io/doc/en/lb4/) CLI  
  Can be installed with `npm`:
  ```shell
  npm i -g @loopback/cli@2.15.1
  ```

- [Dart](https://dart.dev) or [Docker](https://www.docker.com/)

- [Backplane project](https://gitlab.com/i3-market/code/wp4/backplane)

- OpenApi Specification of a Backplane subsystem


## Further Information

This integrator is being developed, and, while it is stable now, it may break if faced with some corner cases.
Although the integrator may not fail and finish normally, if you see some errors in the generated files or, for example
the integrator logs lists fewer endpoints than expected, it will be most probably due to the integrator.   
If you come across any problem, don't hesitate to open an issue.

## Contributing


## License
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
