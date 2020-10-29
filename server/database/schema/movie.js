// 电影数据的schema
const mongoose = require('mongoose')
// 创建schema
const Schema = mongoose.Schema
// 定义数据类型
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },

  category: [{
    type: ObjectId,
    ref: 'Category'
  }],

  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,

  tags: [String],
  
  // 处理创建时间和更新时间
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// 保存数据前的处理
movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// 创建模型
mongoose.model('Movie', movieSchema)