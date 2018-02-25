/**
 * Created by Eabasir on 30/02/2018.
 */
const Base = require('./base.model');
const error = require('./errors.list');
const mongoose = require('mongoose');

class Page extends Base {

  constructor(test = Page.test) {

    super('Page', test);

    this.PageModel = this.model
  }


  getPage(id) {

    id = id.trim();
    if (!mongoose.Types.ObjectId.isValid(id))
      return Promise.reject(error.invalidId);

    return this.PageModel.aggregate(
      [
        {
          $match: {_id: mongoose.Types.ObjectId(id)}
        },
        {
          $lookup: {
            from: "collections",
            localField: "page_info.collection_id",
            foreignField: "_id",
            as: "collection"
          }
        },
        {
          $unwind: {
            path: '$collection',
            preserveNullAndEmptyArrays: true
          }
        },
      ]
    );
  }


  setPage(body, id) {
    if (!body.address)
      return Promise.reject(error.pageAddressRequired);
    if (!body.hasOwnProperty('is_app'))
      return Promise.reject(error.pageTypeRequired);


    if (!id) {

      let obj = {
        address: body.address,
        is_app: body.is_app
      };
      if (body.collection_id) {
        obj.page_info = {};

        if (!mongoose.Types.ObjectId.isValid(body.collection_id))
          return Promise.reject(error.invalidId);

        obj.page_info.collection_id = body.collection_id;
        if (body.content)
          obj.page_info.content = body.content;

      }
      let newPage = new this.PageModel(obj);
      return newPage.save();

    } else {

      if (!mongoose.Types.ObjectId.isValid(id))
        return Promise.reject(error.invalidId);

      return this.PageModel.update({
          "_id": mongoose.Types.ObjectId(id),
        },
        {
          $set: {
            'address': body.address,
            'is_app': body.is_app,
          }
        });
    }
  }

  getPageAllPlacements(id) {
    if(!id) return Promise.reject(error.pageIdRequired);
    if (!mongoose.Types.ObjectId(id)) return Promise.reject(error.pageIdIsNotValid);

    // return this.PageModel.find({_id: mongoose.Types.ObjectId(id)}).populate('placement');

    return this.PageModel.aggregate([
      {
        $match: {_id: mongoose.Types.ObjectId(id)}
      },
      {
        $lookup: {
          from: 'placement',
          localField: 'placement',
          foreignField: '_id',
          as: 'pagePlacement'
        }
      },
      {
        $unwind: {
          path: '$pagePlacement',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'placement_info',
          localField: 'pagePlacement.info',
          foreignField: '_id',
          as: 'pagePlacementInfo'
        }
      },
      {
        $unwind: {
          path: '$pagePlacementInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'pages_info',
          localField: 'page_info',
          foreignField: '_id',
          as: 'pageInfo'
        }
      },
      {
        $unwind: {
          path: '$pageInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'collections',
          localField: 'pageInfo.collection_id',
          foreignField: '_id',
          as: 'pageCollection'
        }
      },
      {
        $unwind: {
          path: '$pageCollection',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: {_id:'$_id', address: '$address', is_app:'$is_app', page_info: '$pageInfo'},
          pagePlacement: {$push: '$pagePlacement'},
        }
      },
    ])
  }

  /**
   * @param:
   *  id : id of page
   * @returns {Promise.<*>}
   */
  deletePage(id) {
    if (!id)
      return Promise.reject(error.pageIdRequired);
    return this.PageModel.remove({_id: mongoose.Types.ObjectId(id)});
  }

  search(options, offset, limit) {
    let phrase = options.phrase ? options.phrase : '';
    let result;


    const match = (options.is_app !== null && options.is_app !== undefined) ? {
      address: {$regex: phrase, $options: 'i'},
      is_app: options.is_app ? "true" : "false"
    } : {address: {$regex: phrase, $options: 'i'}};


    return this.PageModel.aggregate(
      [
        {
          $match: match
        },
        {
          $lookup: {
            from: "collections",
            localField: "page_info.collection_id",
            foreignField: "_id",
            as: "collection"
          }
        },
        {
          $unwind: {
            path: '$collection',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            "address": 1,
            "is_app": 1,
            "collection.name": 1,
          }
        },
        {
          $sort: {
            'address': 1,
          }
        },
        {
          $skip: Number.parseInt(offset)
        },
        {
          $limit: Number.parseInt(limit)
        }
      ]
    ).then(res => {
      result = res;
      return this.PageModel.aggregate(
        [
          {
            $match: match
          },
          {
            $lookup: {
              from: "collections",
              localField: "page_info.collection_id",
              foreignField: "_id",
              as: "collection"
            }
          },
          {
            $unwind: {
              path: '$collection',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $count: "count"
          }
        ])
    }).then(res => {
      let totalCount = res[0] ? res[0].count : 0;
      return Promise.resolve({
        data: result,
        total: totalCount,
      });
    });
  }
}

Page.test = false;

module.exports = Page;