package com.commit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.commit.entity.Board;
import com.commit.model.BoardDto;
import com.commit.model.BoardLikeDto;
import com.commit.repository.BoardDao;
import com.commit.repository.MembersDao;

import jakarta.transaction.Transactional;

@Service
public class BoardService {
	@Autowired
	private final BoardDao boardDao;
	@Autowired
	private final MembersDao memberDao;
	    
	    public BoardService(BoardDao boardDao, MembersDao memberDao) {
	        this.boardDao = boardDao;
	        this.memberDao = memberDao;
	    }
	    
	   //게시판 글 작성 메서드
	   @Transactional
	   public Integer boardWrite(BoardDto boardDto) {
		   return boardDao.save(boardDto.toEntity()).getId();
	   }
	   
	   // 게시판 글 목록 조회 메서드
	    @Transactional
	    public Page<BoardDto> getBoardList(Pageable pageable){
	        Page<Board> boards = boardDao.findAll(pageable);
	        Page<BoardDto> boardDtoList = boards.map(board -> BoardDto.builder()
	                .id(board.getId())
	                .title(board.getTitle())
	                .content(board.getContent())
	                .membersId(board.getMembersId())
	                .createDate(board.getCreateDate())
	                .viewcount(board.getViewcount())
	                .build());

	        return boardDtoList;           
	    }
	   
	  //게시판 글 상세 조회 메서드
	  @Transactional
	  public BoardDto getBoard(Integer id) {
		  Optional<Board> boardWrapper = boardDao.findById(id);
		  
		  Board board = boardWrapper.get();
		  
		  	// 조회수 증가 메서드
		    if (board.getViewcount() == null) {
		        board.setViewcount(0);
		    }
		    board.setViewcount(board.getViewcount() + 1);
		    boardDao.save(board);
		  
		  BoardDto boardDto = BoardDto.builder()
				  .id(board.getId())
				  .title(board.getTitle())
				  .content(board.getContent())
				  .category(board.getCategory())
				  .membersId(board.getMembersId())
				  .createDate(board.getCreateDate())
				  .updateDate(board.getUpdateDate())
				  .viewcount(board.getViewcount())
				  .likecount(board.getLikecount())
				  .deleteYN(board.getDeleteYN())
				  .build();
		  
		  return boardDto;
	  }
	   
	  
	  //게시판 글 삭제 메서드
	  @Transactional
	  public void boarddelete(Integer id) {
		  boardDao.deleteById(id);
	  }
	  
	  // 게시판 글 수정 메서드
	  @Transactional
	  public void boardedit(Integer id, BoardDto updatedBoardDto) {
	      Board board = boardDao.findById(id)
	              .orElseThrow();

	      // 업데이트된 내용을 새로운 BoardDto 엔티티로 변환
	      Board updatedBoardEntity = updatedBoardDto.toEntity();

	      // 엔티티의 필드를 업데이트 (제목, 내용, 카테고리만 업데이트하도록 합니다.)
	      if (updatedBoardEntity.getTitle() != null) {
	          board.setTitle(updatedBoardEntity.getTitle());
	      }
	      if (updatedBoardEntity.getContent() != null) {
	          board.setContent(updatedBoardEntity.getContent());
	      }
	      if (updatedBoardEntity.getCategory() != null) {
	          board.setCategory(updatedBoardEntity.getCategory());
	      }

	      // 수정된 게시글을 저장합니다.
	      boardDao.save(board);
	  }
	  
	  //게시판 글 검색 메서드
	  @Transactional
	  public List<Board> searchBoard(String keyword, String option) {
	      return boardDao.searchBoard(keyword, option);
	  }
	  
	  //좋아요 메서드
	  public BoardDto like(Integer id, Integer membersId) {
		    Optional<Board> boardOptional = boardDao.findById(id);
		    if (boardOptional.isPresent()) {
		        Board board = boardOptional.get();
		        Integer likecount = board.getLikecount() + 1;
		        board.setLikecount(likecount);
		        boardDao.save(board);

		        // 좋아요 증가 후의 정보를 포함하는 DTO를 생성하여 반환
		        BoardDto boardDto = new BoardDto();
		        boardDto.setId(id);
		        boardDto.setTitle(board.getTitle());
		        boardDto.setContent(board.getContent());
		        boardDto.setCreateDate(board.getCreateDate());
		        boardDto.setMembersId(board.getMembersId());
		        boardDto.setViewcount(board.getViewcount());
		        boardDto.setLikecount(likecount);  // 추가

		        return boardDto;
		    }

		    // 게시글이 존재하지 않을 경우 RuntimeException을 던짐
		    throw new RuntimeException("게시글이 존재하지 않습니다. id: " + id);
		}

}
