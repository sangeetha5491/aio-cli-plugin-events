/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const BaseCommand = require('../../../BaseCommand.js')
const { cli } = require('cli-ux')
const aioLogger = require('@adobe/aio-lib-core-logging')('@adobe/aio-cli-plugin-events:provider:get', { provider: 'debug' })

class ProviderDeleteCommand extends BaseCommand {
  async run () {
    const { args } = this.parse(ProviderDeleteCommand)

    try {
      await this.initSdk()
      await this.eventClient.deleteProvider(this.conf.org.id, this.conf.project.id, this.conf.workspace.id, args.providerId)
      this.log('Provider ' + args.providerId + ' has been deleted successfully')
    } catch (err) {
      cli.action.stop()
      aioLogger.debug(err)
      this.error(err.message)
    } finally {
      cli.action.stop()
    }
  }
}

ProviderDeleteCommand.description = 'Delete provider by id'

ProviderDeleteCommand.args = [
  { name: 'providerId', required: true }
]

ProviderDeleteCommand.flags = {
  ...BaseCommand.flag
}

module.exports = ProviderDeleteCommand