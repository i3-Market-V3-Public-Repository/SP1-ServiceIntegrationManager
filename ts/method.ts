/**
 *
 *
 * @param where
 * @returns Registry model count
 */
@operation('get', '/registries/count', {
    'x-controller-name': 'RegistryController',
    'x-operation-name': 'count',
    tags: [
        'RegistryController',
    ],
    responses: {
        '200': {
            description: 'Registry model count',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/loopback.Count',
                    },
                },
            },
        },
    },
    parameters: [
        {
            name: 'where',
            in: 'query',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        title: 'Registry.WhereFilter',
                        additionalProperties: true,
                        'x-typescript-type': '@loopback/repository#Where<Registry>',
                    },
                },
            },
        },
    ],
    operationId: 'RegistryController.count',
})
async count(@param({
    name: 'where',
    in: 'query',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'Registry.WhereFilter',
                additionalProperties: true,
                'x-typescript-type': '@loopback/repository#Where<Registry>',
            },
        },
    },
}) where: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [additionalProperty: string]: any;
} | undefined): Promise<LoopbackCount> {
    throw new Error('Not implemented');
}