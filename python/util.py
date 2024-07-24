
import logging
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
import os
my_config = Config(
    region_name = 'eu-central-2',
    signature_version = 'v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)


def upload_file(file_name, bucket='s3.hammer.guide', object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3', config=my_config)
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    print(f'uploaded {file_name} to {bucket}')
    return True


def save_as(content, file):
    text_file = open(file, "w", encoding="latin-1")
    if isinstance(content, str):
        text_file.write(content)
    else:
        text_file.write(content.decode("latin-1"))
    text_file.close()

