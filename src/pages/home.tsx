import React from 'react';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { GroButton, GroTable } from '@gro-bak/gro-ui';

// eslint-disable-next-line import/extensions

const viewDocument = async (url: string) => {
  return new Promise((resolve, reject) => {
    if (process.env.NEXT_PUBLIC_S3_ACCESS_BEAN && process.env.NEXT_PUBLIC_S3_SECRET_BEAN) {
      const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_S3_REGION_BEAN,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_BEAN,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_BEAN
        }
      });

      try {
        s3Client
          .send(
            new GetObjectCommand({
              Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_BEAN,
              Key: url
            })
          )
          .then(async (response) => {
            const body = response.Body as ReadableStream;
            const reader = body.getReader();
            let done = false;
            const allUint8Array = [];
            while (!done) {
              // eslint-disable-next-line no-await-in-loop
              const chunk = await reader.read();
              done = chunk.done;
              allUint8Array.push(chunk.value);
            }

            const fileFormat = url.split('.').pop();
            // mimetype pdf
            const blob = new Blob(allUint8Array, {
              type: fileFormat === 'pdf' ? 'application/pdf' : 'image/jpeg'
            });
            const blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          });
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new Error('Please provide s3 access & secret'));
    }
  });
  // }
};

const Home = () => {
  /**
   * commented one are for examples only
   * uncomment those to see the table
   * please remove the commented code once you are done
   */
  // const { getAdditionalFiles } = useDocumentService();
  // const { data } = useSWR(`additional-files`, getAdditionalFiles);
  return (
    <main className="px-4">
      <GroTable
        // data={data?.additionalFiles.data || []}
        data={[]}
        style={{
          display: 'flex'
        }}
        columns={[
          {
            name: 'Filename',
            cell: (row) => <div>{row.fileName}</div>
          },
          {
            name: 'Date Uploaded',
            cell: (row) => <div>{row.createdAt}</div>
          },
          {
            name: 'Organization ID',
            cell: (row) => <div>{row.organizationId}</div>
          },
          {
            name: 'Action',
            cell: (row) => (
              <GroButton
                onClick={() =>
                  viewDocument(row.s3FileID).then((file: any) => {
                    window.open(file, '_blank', 'noopener,noreferrer');
                  })
                }
                secondary>
                Download
              </GroButton>
            )
          }
        ]}
      />
    </main>
  );
};

export default Home;
