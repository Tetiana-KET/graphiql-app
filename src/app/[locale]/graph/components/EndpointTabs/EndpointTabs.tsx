'use client';

import { Card, CardBody, Input, Tab, Tabs } from '@nextui-org/react';

export function EndpointTabs() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="url-tab" title="URL">
          <Card>
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label="URL" placeholder="Enter your URL" />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
