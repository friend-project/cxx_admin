import path from 'path';
import uploadFile from '../../library/upload';

const File = {};

/*
 * file upload
 * @return result(json);
 */
File.map = async (ctx, next) => {
  try {
    // 上传 map 文件
    let result = { success: false };
    let serverFilePath = path.join(__dirname, '../../uploads');
    result = await uploadFile(ctx, {
      fileType: 'map',
      path: serverFilePath,
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default File;

