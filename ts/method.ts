/**
 *
 *
 * @param _requestBody dataOffering
 * @returns OK
 */
@operation('post', '/api/registration/data-offering', {
    tags: [
        'registration-offering',
    ],
    summary: 'register a data offering',
    operationId: 'dataOfferingUsingPOST',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/DataOffering',
                },
            },
        },
        description: 'dataOffering',
        required: true,
    },
    responses: {
        '200': {
            description: 'OK',
            content: {
                '*/*': {
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/DataOfferingId',
                        },
                    },
                },
            },
        },
        '201': {
            description: 'Created',
        },
        '400': {
            description: 'failed to save offerings',
        },
        '401': {
            description: 'Unauthorized',
        },
        '403': {
            description: 'Forbidden',
        },
        '404': {
            description: 'Not Found',
        },
    },
    deprecated: false,
})
async dataOfferingUsingPost(@requestBody({
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/DataOffering',
            },
        },
    },
    description: 'dataOffering',
    required: true,
}) _requestBody: DataOffering): Promise<DataOfferingId[]> {
    throw new Error('Not implemented');
}